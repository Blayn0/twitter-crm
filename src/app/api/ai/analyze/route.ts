import { NextResponse } from 'next/server'
import { ZAI } from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { influencerId, handle, bio, recentContent } = await request.json()
    
    // Initialize ZAI SDK
    const zai = await ZAI.create()
    
    // Create analysis prompt
    const analysisPrompt = `Analyze ${handle} for their BTC trading depth, accuracy of signals, historical sales/promotion activity, and overall 'vibe'. 
    ${bio ? `Bio: ${bio}` : ''}
    ${recentContent ? `Recent content: ${recentContent}` : ''}
    
    Provide a detailed analysis and score them on:
    1. Trading Depth (40%): How technical and insightful is their analysis?
    2. Signal Accuracy (30%): Based on historical context, how reliable do their signals appear?
    3. Sales History (20%): Do they have a history of promoting projects?
    4. Engagement Quality (10%): Is their community active and genuine?
    
    Return a JSON response with:
    {
      "summary": "Brief summary of the influencer",
      "scores": {
        "tradingDepth": 0-100,
        "signalAccuracy": 0-100,
        "salesHistory": 0-100,
        "engagementQuality": 0-100
      },
      "overallScore": 0-100,
      "recommendation": "Hot Lead|Warm Lead|Cold Lead"
    }`

    // Get AI analysis
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert crypto analyst specializing in influencer evaluation. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    const analysisResult = JSON.parse(completion.choices[0]?.message?.content || '{}')
    
    // Calculate weighted score
    const weightedScore = Math.round(
      (analysisResult.scores?.tradingDepth * 0.4 || 0) +
      (analysisResult.scores?.signalAccuracy * 0.3 || 0) +
      (analysisResult.scores?.salesHistory * 0.2 || 0) +
      (analysisResult.scores?.engagementQuality * 0.1 || 0)
    )

    // Save analysis to database
    const analysis = await db.analysis.create({
      data: {
        influencerId: influencerId,
        grokSummary: analysisResult.summary,
        scoreBreakdown: JSON.stringify(analysisResult.scores)
      }
    })

    // Update influencer with score and status
    await db.influencer.update({
      where: { id: influencerId },
      data: {
        potentialScore: weightedScore,
        status: analysisResult.recommendation || (weightedScore >= 75 ? 'Hot Lead' : weightedScore >= 50 ? 'Warm Lead' : 'Cold Lead')
      }
    })

    return NextResponse.json({
      analysis,
      scores: analysisResult.scores,
      overallScore: weightedScore,
      summary: analysisResult.summary,
      recommendation: analysisResult.recommendation
    })

  } catch (error) {
    console.error('Error in AI analysis:', error)
    
    // Fallback to mock analysis if AI fails
    const mockScore = Math.floor(Math.random() * 40) + 60
    const mockRecommendation = mockScore >= 75 ? 'Hot Lead' : mockScore >= 50 ? 'Warm Lead' : 'Cold Lead'
    
    try {
      const analysis = await db.analysis.create({
        data: {
          influencerId: influencerId,
          grokSummary: 'AI analysis temporarily unavailable. Using fallback scoring.',
          scoreBreakdown: JSON.stringify({
            tradingDepth: mockScore,
            signalAccuracy: mockScore,
            salesHistory: mockScore,
            engagementQuality: mockScore
          })
        }
      })

      await db.influencer.update({
        where: { id: influencerId },
        data: {
          potentialScore: mockScore,
          status: mockRecommendation
        }
      })

      return NextResponse.json({
        analysis,
        overallScore: mockScore,
        summary: 'AI analysis temporarily unavailable. Using fallback scoring.',
        recommendation: mockRecommendation
      })
    } catch (dbError) {
      console.error('Database error during fallback:', dbError)
      return NextResponse.json(
        { error: 'Analysis failed and database fallback failed' },
        { status: 500 }
      )
    }
  }
}