import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.handle) {
      return NextResponse.json(
        { error: 'Handle is required' },
        { status: 400 }
      )
    }

    // Check if influencer already exists
    const existingInfluencer = await db.influencer.findUnique({
      where: { handle: data.handle }
    })

    if (existingInfluencer) {
      return NextResponse.json(
        { error: 'Influencer with this handle already exists' },
        { status: 409 }
      )
    }

    // Create new influencer
    const influencer = await db.influencer.create({
      data: {
        handle: data.handle,
        bio: data.bio || null,
        profileUrl: data.profileUrl || `https://twitter.com/${data.handle.replace('@', '')}`,
        websiteUrl: data.websiteUrl || null,
        followerCount: data.followerCount ? parseInt(data.followerCount) : null,
        potentialScore: data.potentialScore ? parseInt(data.potentialScore) : 50, // Default score
        status: 'Engaged' // As requested, new influencers go to Engaged column
      },
      include: {
        contacts: true,
        activities: true,
        analyses: true
      }
    })

    return NextResponse.json(influencer, { status: 201 })
  } catch (error) {
    console.error('Error adding influencer:', error)
    return NextResponse.json(
      { error: 'Failed to add influencer' },
      { status: 500 }
    )
  }
}
