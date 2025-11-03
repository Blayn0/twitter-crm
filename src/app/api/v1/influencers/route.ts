import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/v1/influencers?status=Hot Lead&limit=50&offset=0
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = status ? { status } : {}

    const influencers = await db.influencer.findMany({
      where,
      include: {
        contacts: true,
        activities: {
          orderBy: { timestamp: 'desc' },
          take: 5
        },
        analyses: {
          orderBy: { analysisDate: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    })

    const totalCount = await db.influencer.count({ where })

    return NextResponse.json({
      data: influencers,
      total_count: totalCount,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching influencers (v1):', error)
    return NextResponse.json(
      { error: 'Failed to fetch influencers' },
      { status: 500 }
    )
  }
}

// POST /api/v1/influencers - Create new influencer
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const influencer = await db.influencer.create({
      data: {
        handle: data.handle,
        followerCount: data.followerCount,
        profileUrl: data.profileUrl,
        bio: data.bio,
        websiteUrl: data.websiteUrl,
        status: data.status || 'New',
        potentialScore: data.potentialScore
      },
      include: {
        contacts: true,
        activities: true,
        analyses: true
      }
    })

    // Trigger webhook for new influencer if it's a hot lead
    if (influencer.status === 'Hot Lead' || (influencer.potentialScore && influencer.potentialScore >= 75)) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/webhook`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'new_hot_lead',
            influencer_id: influencer.id,
            influencer_handle: influencer.handle,
            potential_score: influencer.potentialScore,
            timestamp: new Date().toISOString()
          })
        })
      } catch (webhookError) {
        console.error('Webhook trigger failed:', webhookError)
      }
    }

    return NextResponse.json(influencer, { status: 201 })
  } catch (error) {
    console.error('Error creating influencer (v1):', error)
    return NextResponse.json(
      { error: 'Failed to create influencer' },
      { status: 500 }
    )
  }
}