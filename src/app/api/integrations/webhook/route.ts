import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event, influencer_id, influencer_handle, potential_score, timestamp } = body

    // Log webhook event
    console.log('Webhook received:', { event, influencer_id, influencer_handle, potential_score, timestamp })

    switch (event) {
      case 'new_hot_lead':
        // Create activity for new hot lead
        await db.activity.create({
          data: {
            influencerId: influencer_id,
            activityType: 'note_added',
            content: `New hot lead detected via webhook. Score: ${potential_score}`
          }
        })

        // You could trigger additional actions here:
        // - Send notification to Slack
        // - Add to external CRM
        // - Send email to team
        // - Add to priority list in project management tool

        return NextResponse.json({
          success: true,
          message: 'Hot lead webhook processed successfully'
        })

      case 'influencer_updated':
        // Handle influencer status updates
        await db.activity.create({
          data: {
            influencerId: influencer_id,
            activityType: 'note_added',
            content: `Influencer updated via webhook: ${JSON.stringify(body)}`
          }
        })

        return NextResponse.json({
          success: true,
          message: 'Influencer update webhook processed successfully'
        })

      case 'outreach_completed':
        // Handle outreach completion
        await db.activity.create({
          data: {
            influencerId: influencer_id,
            activityType: 'note_added',
            content: `Outreach completed via webhook`
          }
        })

        return NextResponse.json({
          success: true,
          message: 'Outreach completion webhook processed successfully'
        })

      default:
        return NextResponse.json(
          { error: 'Unknown webhook event' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}