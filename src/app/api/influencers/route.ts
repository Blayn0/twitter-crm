import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const influencers = await db.influencer.findMany({
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
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(influencers)
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch influencers' },
      { status: 500 }
    )
  }
}

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
        status: data.status || 'New'
      },
      include: {
        contacts: true,
        activities: true,
        analyses: true
      }
    })

    return NextResponse.json(influencer, { status: 201 })
  } catch (error) {
    console.error('Error creating influencer:', error)
    return NextResponse.json(
      { error: 'Failed to create influencer' },
      { status: 500 }
    )
  }
}