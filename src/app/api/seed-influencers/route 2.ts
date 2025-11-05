import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const influencers = [
  {
    handle: '@elonmusk',
    followerCount: 180000000,
    profileUrl: 'https://x.com/elonmusk',
    bio: 'CEO of Tesla, SpaceX, and X.',
    websiteUrl: 'https://tesla.com',
    status: 'New',
    potentialScore: 95
  },
  {
    handle: '@cz_binance',
    followerCount: 8500000,
    profileUrl: 'https://x.com/cz_binance',
    bio: 'Founder of Binance.',
    websiteUrl: 'https://binance.com',
    status: 'New',
    potentialScore: 92
  },
  {
    handle: '@CoinDesk',
    followerCount: 5200000,
    profileUrl: 'https://x.com/CoinDesk',
    bio: 'Leading blockchain news.',
    websiteUrl: 'https://coindesk.com',
    status: 'New',
    potentialScore: 88
  }
]

export async function POST() {
  try {
    // Clear existing data
    await db.activity.deleteMany()
    await db.contact.deleteMany()
    await db.analysis.deleteMany()
    await db.influencer.deleteMany()

    // Add new influencers
    const createdInfluencers = await Promise.all(
      influencers.map(async (influencer) => {
        const created = await db.influencer.create({
          data: influencer
        })

        // Add contacts for some influencers
        if (influencer.websiteUrl && Math.random() > 0.3) {
          await db.contact.create({
            data: {
              influencerId: created.id,
              email: `contact@${new URL(influencer.websiteUrl).hostname}`,
              contactType: 'business',
              isVerified: false
            }
          })
        }

        // Add initial activity
        await db.activity.create({
          data: {
            influencerId: created.id,
            activityType: 'note_added',
            content: `Influencer added to CRM system. Initial score: ${influencer.potentialScore}`
          }
        })

        return created
      })
    )

    return NextResponse.json({
      message: `Successfully added ${createdInfluencers.length} influencers to the database`,
      influencers: createdInfluencers
    })
  } catch (error) {
    console.error('Error seeding influencers:', error)
    return NextResponse.json(
      { error: 'Failed to seed influencers' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await db.influencer.count()
    const influencers = await db.influencer.findMany({
      include: {
        contacts: true,
        activities: {
          orderBy: { timestamp: 'desc' },
          take: 3
        }
      }
    })

    return NextResponse.json({
      count,
      influencers
    })
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch influencers' },
      { status: 500 }
    )
  }
}
