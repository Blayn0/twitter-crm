import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const influencers = [
  {
    handle: '@Danny_Crypton',
    followerCount: 150000,
    profileUrl: 'https://x.com/Danny_Crypton',
    bio: 'Crypto analyst and trader. Sharing technical analysis and market insights. Bitcoin maximalist.',
    websiteUrl: 'https://dannycrypton.com',
    status: 'New'
  },
  {
    handle: '@cryptocevo',
    followerCount: 85000,
    profileUrl: 'https://x.com/cryptocevo',
    bio: 'Cryptocurrency enthusiast and trader. Daily market updates and trading strategies.',
    websiteUrl: 'https://cryptocevo.com',
    status: 'New'
  },
  {
    handle: '@QuintenFrancois',
    followerCount: 120000,
    profileUrl: 'https://x.com/QuintenFrancois',
    bio: 'DeFi researcher and crypto analyst. Deep dives into blockchain technology and market trends.',
    websiteUrl: 'https://quintenfrancois.com',
    status: 'New'
  },
  {
    handle: '@wannabechamp',
    followerCount: 200000,
    profileUrl: 'https://x.com/wannabechamp',
    bio: 'Professional crypto trader and investor. Sharing winning strategies and market analysis.',
    websiteUrl: 'https://wannabechamp.io',
    status: 'New'
  },
  {
    handle: '@GaryCardone',
    followerCount: 500000,
    profileUrl: 'https://x.com/GaryCardone',
    bio: 'Entrepreneur, investor, and crypto advocate. Building the future of finance.',
    websiteUrl: 'https://garycardone.com',
    status: 'New'
  },
  {
    handle: '@AtifHussainOG',
    followerCount: 95000,
    profileUrl: 'https://x.com/AtifHussainOG',
    bio: 'Crypto analyst and content creator. Technical analysis and market insights.',
    websiteUrl: 'https://atifhussain.com',
    status: 'New'
  },
  {
    handle: '@Cointelegraph',
    followerCount: 2500000,
    profileUrl: 'https://x.com/Cointelegraph',
    bio: 'The latest blockchain news & crypto trends. Media coverage of the crypto ecosystem.',
    websiteUrl: 'https://cointelegraph.com',
    status: 'New'
  }
]

export async function POST() {
  try {
    console.log('Starting to seed database with influencers...')
    
    // Clear existing influencers
    await db.influencer.deleteMany()
    console.log('Cleared existing influencers')
    
    // Add new influencers
    const createdInfluencers = await Promise.all(
      influencers.map(async (influencer) => {
        const created = await db.influencer.create({
          data: influencer
        })
        console.log(`Created influencer: ${influencer.handle}`)
        return created
      })
    )

    // Add some initial contacts for some influencers
    const contacts = [
      {
        influencerId: createdInfluencers[0].id, // Danny_Crypton
        email: 'contact@dannycrypton.com',
        contactType: 'business',
        isVerified: false
      },
      {
        influencerId: createdInfluencers[1].id, // cryptocevo
        email: 'info@cryptocevo.com',
        contactType: 'business',
        isVerified: false
      },
      {
        influencerId: createdInfluencers[3].id, // wannabechamp
        email: 'partnerships@wannabechamp.io',
        contactType: 'business',
        isVerified: false
      },
      {
        influencerId: createdInfluencers[4].id, // GaryCardone
        email: 'media@garycardone.com',
        contactType: 'business',
        isVerified: false
      },
      {
        influencerId: createdInfluencers[6].id, // Cointelegraph
        email: 'press@cointelegraph.com',
        contactType: 'business',
        isVerified: true
      }
    ]

    await Promise.all(
      contacts.map(async (contact) => {
        await db.contact.create({
          data: contact
        })
        console.log(`Created contact for influencer ID: ${contact.influencerId}`)
      })
    )

    // Add some initial activities
    const activities = [
      {
        influencerId: createdInfluencers[0].id,
        activityType: 'note_added',
        content: 'Initial discovery via manual search. High follower count with good engagement.'
      },
      {
        influencerId: createdInfluencers[4].id,
        activityType: 'note_added',
        content: 'Major influencer with 500K+ followers. Potential for high-impact partnership.'
      },
      {
        influencerId: createdInfluencers[6].id,
        activityType: 'note_added',
        content: 'Major crypto media outlet. Excellent for brand exposure and credibility.'
      }
    ]

    await Promise.all(
      activities.map(async (activity) => {
        await db.activity.create({
          data: activity
        })
        console.log(`Created activity for influencer ID: ${activity.influencerId}`)
      })
    )

    console.log('Database seeding completed successfully!')

    return NextResponse.json({
      message: 'Database seeded successfully',
      influencers: createdInfluencers.length,
      contacts: contacts.length,
      activities: activities.length
    })

  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}