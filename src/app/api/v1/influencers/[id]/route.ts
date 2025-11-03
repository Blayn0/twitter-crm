import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/v1/influencers/{id}
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
    console.error('Error fetching influencer (v1):', error)
    return NextResponse.json(
      { error: 'Failed to fetch influencer' },
      { status: 500 }
    )
  }
}

// PUT /api/v1/influencers/{id}
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

    // Trigger webhook for status updates
    if (data.status) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/webhook`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'influencer_updated',
            influencer_id: influencer.id,
            influencer_handle: influencer.handle,
            new_status: data.status,
            timestamp: new Date().toISOString()
          })
        })
      } catch (webhookError) {
        console.error('Webhook trigger failed:', webhookError)
      }
    }

    return NextResponse.json(influencer)
  } catch (error) {
    console.error('Error updating influencer (v1):', error)
    return NextResponse.json(
      { error: 'Failed to update influencer' },
      { status: 500 }
    )
  }
}