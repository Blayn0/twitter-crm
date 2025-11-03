import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const influencer = await db.influencer.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        contacts: true,
        activities: {
          orderBy: { timestamp: 'desc' }
        },
        analyses: {
          orderBy: { analysisDate: 'desc' }
        }
      }
    })

    if (!influencer) {
      return NextResponse.json(
        { error: 'Influencer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(influencer)
  } catch (error) {
    console.error('Error fetching influencer:', error)
    return NextResponse.json(
      { error: 'Failed to fetch influencer' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const influencer = await db.influencer.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.potentialScore && { potentialScore: data.potentialScore }),
        ...(data.bio && { bio: data.bio }),
        ...(data.followerCount && { followerCount: data.followerCount }),
        ...(data.websiteUrl && { websiteUrl: data.websiteUrl })
      },
      include: {
        contacts: true,
        activities: true,
        analyses: true
      }
    })

    return NextResponse.json(influencer)
  } catch (error) {
    console.error('Error updating influencer:', error)
    return NextResponse.json(
      { error: 'Failed to update influencer' },
      { status: 500 }
    )
  }
}