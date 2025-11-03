import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check if we're in a Netlify environment without proper database setup
    if (process.env.NETLIFY === 'true' && !process.env.DATABASE_URL) {
      // Return mock data for testing when database is not configured
      return NextResponse.json({
        totalInfluencers: 1,
        newLeadsThisWeek: 1,
        conversionRate: 0,
        topScoringInfluencers: 0,
        hotLeads: 0,
        warmLeads: 0,
        coldLeads: 0,
        contacted: 0,
        engaged: 0
      })
    }

    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Get total influencers
    const totalInfluencers = await db.influencer.count()

    // Get new leads this week
    const newLeadsThisWeek = await db.influencer.count({
      where: {
        createdAt: {
          gte: weekAgo
        }
      }
    })

    // Get counts by status
    const hotLeads = await db.influencer.count({
      where: { status: 'Hot Lead' }
    })
    const warmLeads = await db.influencer.count({
      where: { status: 'Warm Lead' }
    })
    const coldLeads = await db.influencer.count({
      where: { status: 'Cold Lead' }
    })
    const contacted = await db.influencer.count({
      where: { status: 'Contacted' }
    })
    const engaged = await db.influencer.count({
      where: { status: 'Engaged' }
    })

    // Calculate conversion rate (engaged / contacted)
    const conversionRate = contacted > 0 ? Math.round((engaged / contacted) * 100) : 0

    // Get top scoring influencers (score > 75)
    const topScoringInfluencers = await db.influencer.count({
      where: {
        potentialScore: {
          gte: 75
        }
      }
    })

    return NextResponse.json({
      totalInfluencers,
      newLeadsThisWeek,
      conversionRate,
      topScoringInfluencers,
      hotLeads,
      warmLeads,
      coldLeads,
      contacted,
      engaged
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    
    // Fallback to mock data if database fails
    if (process.env.NETLIFY === 'true') {
      return NextResponse.json({
        totalInfluencers: 1,
        newLeadsThisWeek: 1,
        conversionRate: 0,
        topScoringInfluencers: 0,
        hotLeads: 0,
        warmLeads: 0,
        coldLeads: 0,
        contacted: 0,
        engaged: 0
      })
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
