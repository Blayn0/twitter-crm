import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Get total influencers and average score
    const totalInfluencers = await db.influencer.count()
    const avgScoreResult = await db.influencer.aggregate({
      _avg: {
        potentialScore: true
      }
    })

    // Get status distribution
    const statusCounts = await db.influencer.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    const statusDistribution = {
      'Hot Lead': 0,
      'Warm Lead': 0,
      'Cold Lead': 0,
      'Contacted': 0,
      'Engaged': 0
    }

    statusCounts.forEach(item => {
      if (item.status in statusDistribution) {
        statusDistribution[item.status as keyof typeof statusDistribution] = item._count.status
      }
    })

    // Get top performers
    const topPerformers = await db.influencer.findMany({
      where: {
        potentialScore: {
          not: null
        }
      },
      select: {
        handle: true,
        potentialScore: true,
        followerCount: true
      },
      orderBy: {
        potentialScore: 'desc'
      },
      take: 10
    })

    const formattedTopPerformers = topPerformers.map(inf => ({
      handle: inf.handle,
      score: inf.potentialScore || 0,
      followers: inf.followerCount || 0
    }))

    return NextResponse.json({
      totalInfluencers,
      avgScore: avgScoreResult._avg.potentialScore || 0,
      topPerformers: formattedTopPerformers,
      statusDistribution
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}