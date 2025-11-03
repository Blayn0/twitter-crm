import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check if we're in a Netlify environment without proper database setup
    if (process.env.NETLIFY === 'true' && !process.env.DATABASE_URL) {
      // Return mock data for testing when database is not configured
      return NextResponse.json([
        {
          id: 1,
          handle: "@test_influencer",
          followerCount: 50000,
          profileUrl: "https://x.com/test_influencer",
          bio: "Test influencer for deployment debugging",
          websiteUrl: null,
          potentialScore: null,
          status: "New",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          contacts: [],
          activities: [],
          analyses: []
        }
      ])
    }

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
    
    // Fallback to mock data if database fails
    if (process.env.NETLIFY === 'true') {
      return NextResponse.json([
        {
          id: 1,
          handle: "@fallback_influencer",
          followerCount: 10000,
          profileUrl: "https://x.com/fallback_influencer",
          bio: "Fallback data - database connection failed",
          websiteUrl: null,
          potentialScore: null,
          status: "New",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          contacts: [],
          activities: [],
          analyses: []
        }
      ])
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch influencers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // For Netlify without database, return a mock response
    if (process.env.NETLIFY === 'true' && !process.env.DATABASE_URL) {
      return NextResponse.json({
        id: Date.now(),
        handle: data.handle,
        followerCount: data.followerCount,
        profileUrl: data.profileUrl,
        bio: data.bio,
        websiteUrl: data.websiteUrl,
        status: data.status || 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        contacts: [],
        activities: [],
        analyses: []
      }, { status: 201 })
    }
    
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
    
    // Fallback for Netlify
    if (process.env.NETLIFY === 'true') {
      const data = await request.json().catch(() => ({}))
      return NextResponse.json({
        id: Date.now(),
        handle: data.handle || "@mock_influencer",
        followerCount: data.followerCount || 0,
        profileUrl: data.profileUrl || "",
        bio: data.bio || "Created offline",
        websiteUrl: data.websiteUrl,
        status: data.status || 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        contacts: [],
        activities: [],
        analyses: []
      }, { status: 201 })
    }
    
    return NextResponse.json(
      { error: 'Failed to create influencer' },
      { status: 500 }
    )
  }
}
