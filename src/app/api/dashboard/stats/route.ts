import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
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
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}