import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const additionalInfluencers = [
  // Additional Tier 1-2 Influencers
  {
    handle: '@martiniguyyt',
    followerCount: 450000,
    profileUrl: 'https://x.com/MartiniGuyYT',
    bio: 'Crypto content creator and analyst. Making complex crypto concepts entertaining.',
    websiteUrl: 'https://martiniguy.com',
    status: 'New',
    potentialScore: 77
  },
  {
    handle: '@coinbureau',
    followerCount: 380000,
    profileUrl: 'https://x.com/coinbureau',
    bio: 'Cryptocurrency news and analysis. Bitcoin, Ethereum, and altcoin coverage.',
    websiteUrl: 'https://coinbureau.com',
    status: 'New',
    potentialScore: 81
  },
  {
    handle: '@AdamBLiv',
    followerCount: 320000,
    profileUrl: 'https://x.com/AdamBLiv',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://adambliv.com',
    status: 'New',
    potentialScore: 75
  },
  {
    handle: '@StoicTA',
    followerCount: 280000,
    profileUrl: 'https://x.com/StoicTA',
    bio: 'Technical analyst and trader. Chart patterns and market analysis.',
    websiteUrl: 'https://stoicta.com',
    status: 'New',
    potentialScore: 79
  },
  {
    handle: '@jimcramer',
    followerCount: 2200000,
    profileUrl: 'https://x.com/jimcramer',
    bio: 'Financial commentator and former hedge fund manager. Stock market analysis.',
    websiteUrl: 'https://madmoney.thestreet.com',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@Rayner_Teo',
    followerCount: 180000,
    profileUrl: 'https://x.com/Rayner_Teo',
    bio: 'Forex trader and educator. Trading strategies and market analysis.',
    websiteUrl: 'https://raynerteo.com',
    status: 'New',
    potentialScore: 73
  },
  {
    handle: '@CryptoDonAlt',
    followerCount: 160000,
    profileUrl: 'https://x.com/CryptoDonAlt',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptodonalt.com',
    status: 'New',
    potentialScore: 76
  },
  {
    handle: '@TheCryptoDog',
    followerCount: 140000,
    profileUrl: 'https://x.com/TheCryptoDog',
    bio: 'Crypto analyst and trader. Market analysis and trading strategies.',
    websiteUrl: 'https://thecryptodog.com',
    status: 'New',
    potentialScore: 74
  },
  {
    handle: '@whale_alert',
    followerCount: 1200000,
    profileUrl: 'https://x.com/whale_alert',
    bio: 'Large cryptocurrency transactions and whale movements tracker.',
    websiteUrl: 'https://whale-alert.io',
    status: 'New',
    potentialScore: 83
  },
  {
    handle: '@WuBlockchain',
    followerCount: 950000,
    profileUrl: 'https://x.com/WuBlockchain',
    bio: 'Chinese blockchain and crypto news. Market analysis and industry updates.',
    websiteUrl: 'https://wublockchain.com',
    status: 'New',
    potentialScore: 80
  },

  // Trading and Forex Influencers
  {
    handle: '@dear_traderr',
    followerCount: 85000,
    profileUrl: 'https://x.com/dear_traderr',
    bio: 'Forex and crypto trader. Technical analysis and market insights.',
    websiteUrl: 'https://deartrader.com',
    status: 'New',
    potentialScore: 69
  },
  {
    handle: '@SJosephBurns',
    followerCount: 78000,
    profileUrl: 'https://x.com/SJosephBurns',
    bio: 'Crypto analyst and trader. Market analysis and trading strategies.',
    websiteUrl: 'https://sjosephburns.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@kruzfx',
    followerCount: 72000,
    profileUrl: 'https://x.com/kruzfx',
    bio: 'Forex trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://kruzfx.com',
    status: 'New',
    potentialScore: 67
  },
  {
    handle: '@Habbyforex_',
    followerCount: 65000,
    profileUrl: 'https://x.com/Habbyforex_',
    bio: 'Forex trader and educator. Trading strategies and market analysis.',
    websiteUrl: 'https://habbyforex.com',
    status: 'New',
    potentialScore: 65
  },
  {
    handle: '@Vivek4real_',
    followerCount: 58000,
    profileUrl: 'https://x.com/Vivek4real_',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://vivek4real.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@matteopelleg',
    followerCount: 52000,
    profileUrl: 'https://x.com/matteopelleg',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://matteopelleg.com',
    status: 'New',
    potentialScore: 66
  },
  {
    handle: '@RealTristan13',
    followerCount: 48000,
    profileUrl: 'https://x.com/RealTristan13',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://realtristan13.com',
    status: 'New',
    potentialScore: 64
  },
  {
    handle: '@therationalroot',
    followerCount: 45000,
    profileUrl: 'https://x.com/therationalroot',
    bio: 'Crypto analyst and researcher. Market analysis and project reviews.',
    websiteUrl: 'https://therationalroot.com',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@rovercrc',
    followerCount: 42000,
    profileUrl: 'https://x.com/rovercrc',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://rovercrc.com',
    status: 'New',
    potentialScore: 62
  },
  {
    handle: '@Trader_Theory',
    followerCount: 38000,
    profileUrl: 'https://x.com/Trader_Theory',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://tradertheory.com',
    status: 'New',
    potentialScore: 61
  },

  // DeFi and Protocol Influencers
  {
    handle: '@0xPolygon',
    followerCount: 2200000,
    profileUrl: 'https://x.com/0xPolygon',
    bio: 'Polygon - Ethereum\'s Internet of Blockchains. Scaling Ethereum for mass adoption.',
    websiteUrl: 'https://polygon.technology',
    status: 'New',
    potentialScore: 89
  },
  {
    handle: '@SushiSwap',
    followerCount: 850000,
    profileUrl: 'https://x.com/SushiSwap',
    bio: 'Decentralized exchange and DeFi platform. Community-driven crypto trading.',
    websiteUrl: 'https://sushi.com',
    status: 'New',
    potentialScore: 82
  },
  {
    handle: '@MetaMask',
    followerCount: 750000,
    profileUrl: 'https://x.com/MetaMask',
    bio: 'A crypto wallet & gateway to blockchain apps. Secure, simple, and powerful.',
    websiteUrl: 'https://metamask.io',
    status: 'New',
    potentialScore: 85
  },
  {
    handle: '@YieldGuild',
    followerCount: 450000,
    profileUrl: 'https://x.com/YieldGuild',
    bio: 'Yield Guild Games - Play-to-earn gaming guild. Metaverse and blockchain gaming.',
    websiteUrl: 'https://yieldguild.io',
    status: 'New',
    potentialScore: 78
  },
  {
    handle: '@DeFiPulse',
    followerCount: 320000,
    profileUrl: 'https://x.com/DeFiPulse',
    bio: 'DeFi analytics and ranking platform. Track decentralized finance protocols.',
    websiteUrl: 'https://defipulse.com',
    status: 'New',
    potentialScore: 80
  },
  {
    handle: '@enzymefinance',
    followerCount: 180000,
    profileUrl: 'https://x.com/enzymefinance',
    bio: 'DeFi asset management platform. On-chain investment strategies.',
    websiteUrl: 'https://enzyme.finance',
    status: 'New',
    potentialScore: 76
  },

  // NFT and Web3 Influencers
  {
    handle: '@BentoBoiNFT',
    followerCount: 95000,
    profileUrl: 'https://x.com/BentoBoiNFT',
    bio: 'NFT collector and analyst. Digital art and blockchain collectibles.',
    websiteUrl: 'https://bentoboi.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@iamdakejr',
    followerCount: 85000,
    profileUrl: 'https://x.com/iamdakejr',
    bio: 'NFT collector and Web3 enthusiast. Digital art and blockchain collectibles.',
    websiteUrl: 'https://dakejr.com',
    status: 'New',
    potentialScore: 69
  },
  {
    handle: '@lynk0x',
    followerCount: 75000,
    profileUrl: 'https://x.com/lynk0x',
    bio: 'Web3 developer and NFT enthusiast. Blockchain technology and digital assets.',
    websiteUrl: 'https://lynk0x.com',
    status: 'New',
    potentialScore: 73
  },

  // Media and News Influencers
  {
    handle: '@CryptoSlate',
    followerCount: 680000,
    profileUrl: 'https://x.com/CryptoSlate',
    bio: 'Cryptocurrency news and analysis. Blockchain technology and market trends.',
    websiteUrl: 'https://cryptoslate.com',
    status: 'New',
    potentialScore: 84
  },
  {
    handle: '@cryptotickerio',
    followerCount: 420000,
    profileUrl: 'https://x.com/cryptotickerio',
    bio: 'Cryptocurrency news and analysis. German crypto market insights.',
    websiteUrl: 'https://cryptoticker.io',
    status: 'New',
    potentialScore: 76
  },
  {
    handle: '@CoinSwitchKuber',
    followerCount: 380000,
    profileUrl: 'https://x.com/CoinSwitchKuber',
    bio: 'Crypto exchange and trading platform. Making crypto accessible in India.',
    websiteUrl: 'https://coinswitch.co',
    status: 'New',
    potentialScore: 72
  },
  {
    handle: '@coincheckjp',
    followerCount: 320000,
    profileUrl: 'https://x.com/coincheckjp',
    bio: 'Japanese cryptocurrency exchange. Crypto trading and market analysis.',
    websiteUrl: 'https://coincheck.com',
    status: 'New',
    potentialScore: 70
  },

  // Additional Trading Influencers
  {
    handle: '@rektfencer',
    followerCount: 35000,
    profileUrl: 'https://x.com/rektfencer',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://rektfencer.com',
    status: 'New',
    potentialScore: 60
  },
  {
    handle: '@tradermike1234',
    followerCount: 32000,
    profileUrl: 'https://x.com/tradermike1234',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://tradermike1234.com',
    status: 'New',
    potentialScore: 58
  },
  {
    handle: '@lemayian001',
    followerCount: 28000,
    profileUrl: 'https://x.com/lemayian001',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://lemayian001.com',
    status: 'New',
    potentialScore: 56
  },
  {
    handle: '@TritonTrades',
    followerCount: 25000,
    profileUrl: 'https://x.com/TritonTrades',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://tritontrades.com',
    status: 'New',
    potentialScore: 57
  },
  {
    handle: '@LozTradez',
    followerCount: 22000,
    profileUrl: 'https://x.com/LozTradez',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://loztradez.com',
    status: 'New',
    potentialScore: 55
  },

  // Business and Finance Influencers
  {
    handle: '@kevinolearytv',
    followerCount: 850000,
    profileUrl: 'https://x.com/kevinolearytv',
    bio: 'Mr. Wonderful - Investor and businessman. Shark Tank star and financial commentator.',
    websiteUrl: 'https://kevinoleary.com',
    status: 'New',
    potentialScore: 72
  },
  {
    handle: '@GuyTalksFinance',
    followerCount: 180000,
    profileUrl: 'https://x.com/GuyTalksFinance',
    bio: 'Financial analyst and commentator. Stock market and investment insights.',
    websiteUrl: 'https://guytalksfinance.com',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@KobeissiLetter',
    followerCount: 450000,
    profileUrl: 'https://x.com/KobeissiLetter',
    bio: 'Financial markets analysis and insights. Global macro and investment strategies.',
    websiteUrl: 'https://kobeissiletter.com',
    status: 'New',
    potentialScore: 76
  },

  // Emerging Crypto Influencers
  {
    handle: '@CryptoCalle',
    followerCount: 95000,
    profileUrl: 'https://x.com/CryptoCalle',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptocalle.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@AlessioUrban',
    followerCount: 85000,
    profileUrl: 'https://x.com/AlessioUrban',
    bio: 'Crypto analyst and trader. Market analysis and trading strategies.',
    websiteUrl: 'https://alessiourban.com',
    status: 'New',
    potentialScore: 73
  },
  {
    handle: '@QaTrader',
    followerCount: 78000,
    profileUrl: 'https://x.com/QaTrader',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://qatrader.com',
    status: 'New',
    potentialScore: 69
  },
  {
    handle: '@cryptotradingsr',
    followerCount: 72000,
    profileUrl: 'https://x.com/cryptotradingsr',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://cryptotradingsr.com',
    status: 'New',
    potentialScore: 67
  },
  {
    handle: '@itsmaxdemarco',
    followerCount: 65000,
    profileUrl: 'https://x.com/itsmaxdemarco',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://itsmaxdemarco.com',
    status: 'New',
    potentialScore: 65
  },
  {
    handle: '@parman_the',
    followerCount: 58000,
    profileUrl: 'https://x.com/parman_the',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://parmanthe.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@BTCPrague',
    followerCount: 52000,
    profileUrl: 'https://x.com/BTCPrague',
    bio: 'Bitcoin enthusiast and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://btcprague.com',
    status: 'New',
    potentialScore: 66
  },
  {
    handle: '@dumbmoneyhunter',
    followerCount: 48000,
    profileUrl: 'https://x.com/dumbmoneyhunter',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://dumbmoneyhunter.com',
    status: 'New',
    potentialScore: 62
  },
  {
    handle: '@chaxbtbg',
    followerCount: 45000,
    profileUrl: 'https://x.com/chaxbtbg',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://chaxbtbg.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@meeky_fx',
    followerCount: 42000,
    profileUrl: 'https://x.com/meeky_fx',
    bio: 'Forex trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://meekyfx.com',
    status: 'New',
    potentialScore: 59
  }
]

export async function POST() {
  try {
    // Add additional influencers without clearing existing ones
    const createdInfluencers = await Promise.all(
      additionalInfluencers.map(async (influencer) => {
        const created = await db.influencer.create({
          data: influencer
        })

        // Add contacts for some influencers
        if (influencer.websiteUrl && Math.random() > 0.3) {
          await db.contact.create({
            data: {
              influencerId: created.id,
              email: `contact@${influencer.websiteUrl.replace('https://', '').replace('https://www.', '').replace('/', '')}`,
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
      message: `Successfully added ${createdInfluencers.length} additional influencers to the database`,
      influencers: createdInfluencers
    })
  } catch (error) {
    console.error('Error seeding additional influencers:', error)
    return NextResponse.json(
      { error: 'Failed to seed additional influencers' },
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