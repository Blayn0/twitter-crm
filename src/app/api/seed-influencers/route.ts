import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const influencers = [
  // Tier 1: Major Influencers (1M+ followers)
  {
    handle: '@airkeson1998',
    followerCount: 5500,
    profileUrl: 'https://x.com/airkeson1998',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://airkeson1998.com',
    status: 'New',
    potentialScore: 46
  },
  {
    handle: '@cz_binance',
    followerCount: 8500000,
    profileUrl: 'https://x.com/cz_binance',
    bio: 'Founder of Binance. Building the crypto infrastructure for the future.',
    websiteUrl: 'https://binance.com',
    status: 'New',
    potentialScore: 92
  },
  {
    handle: '@CoinDesk',
    followerCount: 5200000,
    profileUrl: 'https://x.com/CoinDesk',
    bio: 'The latest blockchain news & crypto trends. Media platform covering cryptocurrency, DeFi, NFTs, and Web3 technologies.',
    websiteUrl: 'https://coindesk.com',
    status: 'New',
    potentialScore: 88
  },
  {
    handle: '@Cointelegraph',
    followerCount: 2500000,
    profileUrl: 'https://x.com/Cointelegraph',
    bio: 'The latest blockchain news & crypto trends. Media platform covering cryptocurrency, DeFi, NFTs, and Web3 technologies.',
    websiteUrl: 'https://cointelegraph.com',
    status: 'New',
    potentialScore: 95
  },
  {
    handle: '@BitcoinMagazine',
    followerCount: 2100000,
    profileUrl: 'https://x.com/BitcoinMagazine',
    bio: 'The world\'s first and foundational digital currency publication. Bitcoin news, analysis, and education.',
    websiteUrl: 'https://bitcoinmagazine.com',
    status: 'New',
    potentialScore: 90
  },
  {
    handle: '@cobie',
    followerCount: 1800000,
    profileUrl: 'https://x.com/cobie',
    bio: 'Crypto investor and trader. Sharing insights on market trends and opportunities.',
    websiteUrl: 'https://cobie.co',
    status: 'New',
    potentialScore: 85
  },
  {
    handle: '@WatcherGuru',
    followerCount: 1500000,
    profileUrl: 'https://x.com/WatcherGuru',
    bio: 'Crypto news and updates. Blockchain technology and market analysis.',
    websiteUrl: 'https://watcherguru.com',
    status: 'New',
    potentialScore: 82
  },
  {
    handle: '@APompliano',
    followerCount: 1300000,
    profileUrl: 'https://x.com/APompliano',
    bio: 'Morgan Creek Digital co-founder. Bitcoin and cryptocurrency advocate.',
    websiteUrl: 'https://morgancreekdigital.com',
    status: 'New',
    potentialScore: 88
  },
  {
    handle: '@maxkeiser',
    followerCount: 900000,
    profileUrl: 'https://x.com/maxkeiser',
    bio: 'Bitcoin maximalist and financial commentator. Host of the Keiser Report.',
    websiteUrl: 'https://maxkeiser.com',
    status: 'New',
    potentialScore: 84
  },
  {
    handle: '@scottmelker',
    followerCount: 750000,
    profileUrl: 'https://x.com/scottmelker',
    bio: 'The Wolf of All Streets. Crypto trader and analyst.',
    websiteUrl: 'https://thewolfofallstreets.com',
    status: 'New',
    potentialScore: 86
  },

  // Tier 2: High-Profile Influencers (100K-1M followers)
  {
    handle: '@milesdeutscher',
    followerCount: 650000,
    profileUrl: 'https://x.com/milesdeutscher',
    bio: 'Crypto analyst and researcher. Deep dives into projects and market trends.',
    websiteUrl: 'https://milesdeutscher.com',
    status: 'New',
    potentialScore: 87
  },
  {
    handle: '@AltcoinDaily',
    followerCount: 550000,
    profileUrl: 'https://x.com/AltcoinDaily',
    bio: 'Daily cryptocurrency news and analysis. Bitcoin, Ethereum, and altcoin coverage.',
    websiteUrl: 'https://altcoindaily.com',
    status: 'New',
    potentialScore: 83
  },
  {
    handle: '@MoonCarl',
    followerCount: 450000,
    profileUrl: 'https://x.com/MoonCarl',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://mooncarl.com',
    status: 'New',
    potentialScore: 81
  },
  {
    handle: '@cryptomanran',
    followerCount: 400000,
    profileUrl: 'https://x.com/cryptomanran',
    bio: 'Crypto analyst and educator. Making complex crypto concepts simple.',
    websiteUrl: 'https://cryptomanran.com',
    status: 'New',
    potentialScore: 79
  },
  {
    handle: '@Bitboy_Crypto',
    followerCount: 380000,
    profileUrl: 'https://x.com/Bitboy_Crypto',
    bio: 'Cryptocurrency news and analysis. Bitcoin, Ethereum, and altcoin coverage.',
    websiteUrl: 'https://bitboycrypto.com',
    status: 'New',
    potentialScore: 78
  },
  {
    handle: '@PeterLBrandt',
    followerCount: 350000,
    profileUrl: 'https://x.com/PeterLBrandt',
    bio: 'Professional trader with 40+ years experience. Classical charting and technical analysis.',
    websiteUrl: 'https://factorresearch.com',
    status: 'New',
    potentialScore: 91
  },
  {
    handle: '@TradingView',
    followerCount: 320000,
    profileUrl: 'https://x.com/TradingView',
    bio: 'Financial charts and trading platform. Tools for traders and investors.',
    websiteUrl: 'https://tradingview.com',
    status: 'New',
    potentialScore: 85
  },
  {
    handle: '@AltcoinBuzzIO',
    followerCount: 300000,
    profileUrl: 'https://x.com/AltcoinBuzzIO',
    bio: 'Cryptocurrency news and analysis. Altcoin coverage and market insights.',
    websiteUrl: 'https://altcoinbuzz.io',
    status: 'New',
    potentialScore: 77
  },
  {
    handle: '@josh_olszewicz',
    followerCount: 280000,
    profileUrl: 'https://x.com/josh_olszewicz',
    bio: 'Technical analyst and trader. Chart patterns and market analysis.',
    websiteUrl: 'https://josholszewicz.com',
    status: 'New',
    potentialScore: 83
  },
  {
    handle: '@MMCrypto',
    followerCount: 250000,
    profileUrl: 'https://x.com/MMCrypto',
    bio: 'Cryptocurrency news and analysis. Bitcoin, Ethereum, and altcoin coverage.',
    websiteUrl: 'https://mmcrypto.io',
    status: 'New',
    potentialScore: 76
  },

  // Additional High-Profile Influencers from your list
  {
    handle: '@DeFiTracer',
    followerCount: 95000,
    profileUrl: 'https://x.com/DeFiTracer',
    bio: 'DeFi researcher and analyst. Deep dives into decentralized finance protocols.',
    websiteUrl: 'https://defitracer.com',
    status: 'New',
    potentialScore: 84
  },
  {
    handle: '@BTC_Archive',
    followerCount: 88000,
    profileUrl: 'https://x.com/BTC_Archive',
    bio: 'Bitcoin historical data and analysis. Preserving Bitcoin\'s history.',
    websiteUrl: 'https://btcarhive.com',
    status: 'New',
    potentialScore: 80
  },
  {
    handle: '@cryptogems555',
    followerCount: 82000,
    profileUrl: 'https://x.com/cryptogems555',
    bio: 'Crypto gem hunter. Finding undervalued projects with high potential.',
    websiteUrl: 'https://cryptogems555.com',
    status: 'New',
    potentialScore: 78
  },
  {
    handle: '@jadecap_',
    followerCount: 78000,
    profileUrl: 'https://x.com/jadecap_',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://jadecap.com',
    status: 'New',
    potentialScore: 75
  },
  {
    handle: '@CarlBMenger',
    followerCount: 72000,
    profileUrl: 'https://x.com/CarlBMenger',
    bio: 'Economics and cryptocurrency analysis. Austrian school perspective.',
    websiteUrl: 'https://carlbmenger.com',
    status: 'New',
    potentialScore: 82
  },
  {
    handle: '@jayalxndr',
    followerCount: 68000,
    profileUrl: 'https://x.com/jayalxndr',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://jayalxndr.com',
    status: 'New',
    potentialScore: 74
  },
  {
    handle: '@pips_daily',
    followerCount: 65000,
    profileUrl: 'https://x.com/pips_daily',
    bio: 'Forex and crypto trading signals. Daily market analysis.',
    websiteUrl: 'https://pipsdaily.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@0xmatti',
    followerCount: 62000,
    profileUrl: 'https://x.com/0xmatti',
    bio: 'DeFi researcher and analyst. Deep dives into decentralized finance.',
    websiteUrl: 'https://0xmatti.com',
    status: 'New',
    potentialScore: 79
  },
  {
    handle: '@ByCoinvo',
    followerCount: 58000,
    profileUrl: 'https://x.com/ByCoinvo',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://bycoinvo.com',
    status: 'New',
    potentialScore: 73
  },
  {
    handle: '@saylordocs',
    followerCount: 55000,
    profileUrl: 'https://x.com/saylordocs',
    bio: 'Crypto analyst and researcher. Market analysis and project reviews.',
    websiteUrl: 'https://saylordocs.com',
    status: 'New',
    potentialScore: 76
  },
  {
    handle: '@naiivememe',
    followerCount: 48000,
    profileUrl: 'https://x.com/naiivememe',
    bio: 'Crypto analyst and meme connoisseur. Market insights with humor.',
    websiteUrl: 'https://naiivememe.com',
    status: 'New',
    potentialScore: 70
  },
  {
    handle: '@NeilJacobs',
    followerCount: 45000,
    profileUrl: 'https://x.com/NeilJacobs',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://neiljacobs.com',
    status: 'New',
    potentialScore: 72
  },
  {
    handle: '@relai_app',
    followerCount: 42000,
    profileUrl: 'https://x.com/relai_app',
    bio: 'Bitcoin investment app. Making Bitcoin accessible to everyone.',
    websiteUrl: 'https://relai.app',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@Energycrypt',
    followerCount: 38000,
    profileUrl: 'https://x.com/Energycrypt',
    bio: 'Energy and cryptocurrency analyst. Sustainable crypto mining.',
    websiteUrl: 'https://energycrypt.com',
    status: 'New',
    potentialScore: 65
  },
  {
    handle: '@jessepollak',
    followerCount: 35000,
    profileUrl: 'https://x.com/jessepollak',
    bio: 'Base protocol lead. Building the future of Ethereum L2.',
    websiteUrl: 'https://base.org',
    status: 'New',
    potentialScore: 81
  },
  {
    handle: '@Noahhcalls',
    followerCount: 32000,
    profileUrl: 'https://x.com/Noahhcalls',
    bio: 'Crypto analyst and trader. Market calls and analysis.',
    websiteUrl: 'https://noahhcalls.com',
    status: 'New',
    potentialScore: 69
  },
  {
    handle: '@arkham',
    followerCount: 30000,
    profileUrl: 'https://x.com/arkham',
    bio: 'Blockchain intelligence platform. On-chain analysis and insights.',
    websiteUrl: 'https://arkhamintelligence.com',
    status: 'New',
    potentialScore: 77
  },
  {
    handle: '@JustinWerlein',
    followerCount: 28000,
    profileUrl: 'https://x.com/JustinWerlein',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://justinwerlein.com',
    status: 'New',
    potentialScore: 67
  },
  {
    handle: '@TedPillows',
    followerCount: 25000,
    profileUrl: 'https://x.com/TedPillows',
    bio: 'Crypto analyst and trader. Market analysis and trading strategies.',
    websiteUrl: 'https://tedpillows.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@SimplyBitcoin',
    followerCount: 22000,
    profileUrl: 'https://x.com/SimplyBitcoin',
    bio: 'Bitcoin education and analysis. Making Bitcoin simple.',
    websiteUrl: 'https://simplybitcoin.com',
    status: 'New',
    potentialScore: 74
  },
  {
    handle: '@IncomeSharks',
    followerCount: 18000,
    profileUrl: 'https://x.com/IncomeSharks',
    bio: 'Crypto analyst and trader. Income generation strategies.',
    websiteUrl: 'https://incomesharks.com',
    status: 'New',
    potentialScore: 66
  },
  {
    handle: '@TheLongInvest',
    followerCount: 15000,
    profileUrl: 'https://x.com/TheLongInvest',
    bio: 'Long-term crypto investor. Fundamental analysis and hodling strategies.',
    websiteUrl: 'https://thelonginvest.com',
    status: 'New',
    potentialScore: 70
  },
  {
    handle: '@MerlijnTrader',
    followerCount: 12000,
    profileUrl: 'https://x.com/MerlijnTrader',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://merlijntrader.com',
    status: 'New',
    potentialScore: 64
  },
  {
    handle: '@TraderAryan',
    followerCount: 10000,
    profileUrl: 'https://x.com/TraderAryan',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://traderaryan.com',
    status: 'New',
    potentialScore: 62
  },
  {
    handle: '@FXAlexGI',
    followerCount: 8500,
    profileUrl: 'https://x.com/FXAlexGI',
    bio: 'Forex and crypto trader. Technical analysis and market insights.',
    websiteUrl: 'https://fxalexgi.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@_Checkmatey_',
    followerCount: 8000,
    profileUrl: 'https://x.com/_Checkmatey_',
    bio: 'Crypto analyst and researcher. On-chain analysis and market insights.',
    websiteUrl: 'https://checkmatey.com',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@BSCGemsAlert',
    followerCount: 7500,
    profileUrl: 'https://x.com/BSCGemsAlert',
    bio: 'BSC gem hunter. Finding undervalued projects on Binance Smart Chain.',
    websiteUrl: 'https://bscgemsalert.com',
    status: 'New',
    potentialScore: 59
  },
  {
    handle: '@joker_szn',
    followerCount: 7000,
    profileUrl: 'https://x.com/joker_szn',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://jokerszn.com',
    status: 'New',
    potentialScore: 58
  },
  {
    handle: '@TradingComposur',
    followerCount: 6500,
    profileUrl: 'https://x.com/TradingComposur',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://tradingcomposur.com',
    status: 'New',
    potentialScore: 60
  },
  {
    handle: '@TpwithPolarity',
    followerCount: 6000,
    profileUrl: 'https://x.com/TpwithPolarity',
    bio: 'Crypto trader and analyst. Market analysis and trading strategies.',
    websiteUrl: 'https://tpwithpolarity.com',
    status: 'New',
    potentialScore: 57
  },

  // Additional influencers from your list
  {
    handle: '@meet_dickson',
    followerCount: 95000,
    profileUrl: 'https://x.com/meet_dickson',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://meetdickson.com',
    status: 'New',
    potentialScore: 73
  },
  {
    handle: '@AltcoinDailyio',
    followerCount: 550000,
    profileUrl: 'https://x.com/AltcoinDailyio',
    bio: 'Daily cryptocurrency news and analysis. Bitcoin, Ethereum, and altcoin coverage.',
    websiteUrl: 'https://altcoindaily.io',
    status: 'New',
    potentialScore: 83
  },
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
    handle: '@PeterLBrandt',
    followerCount: 350000,
    profileUrl: 'https://x.com/PeterLBrandt',
    bio: 'Professional trader with 40+ years experience. Classical charting and technical analysis.',
    websiteUrl: 'https://factorresearch.com',
    status: 'New',
    potentialScore: 91
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
    handle: '@trad_ISABEL',
    followerCount: 280000,
    profileUrl: 'https://x.com/trad_ISABEL',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://tradisabel.com',
    status: 'New',
    potentialScore: 74
  },
  {
    handle: '@BitcoinNews21M',
    followerCount: 250000,
    profileUrl: 'https://x.com/BitcoinNews21M',
    bio: 'Bitcoin news and analysis. Latest updates on Bitcoin and cryptocurrency.',
    websiteUrl: 'https://bitcoinnews21m.com',
    status: 'New',
    potentialScore: 76
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
    handle: '@EliteOptions2',
    followerCount: 180000,
    profileUrl: 'https://x.com/EliteOptions2',
    bio: 'Options trading and analysis. Technical analysis and market insights.',
    websiteUrl: 'https://eliteoptions2.com',
    status: 'New',
    potentialScore: 72
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
    handle: '@GuyTalksFinance',
    followerCount: 180000,
    profileUrl: 'https://x.com/GuyTalksFinance',
    bio: 'Financial analyst and commentator. Stock market and investment insights.',
    websiteUrl: 'https://guytalksfinance.com',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@Quanterty',
    followerCount: 150000,
    profileUrl: 'https://x.com/Quanterty',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://quanterty.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@LumiTraders',
    followerCount: 120000,
    profileUrl: 'https://x.com/LumiTraders',
    bio: 'Crypto trading and analysis. Technical analysis and market insights.',
    websiteUrl: 'https://lumitraders.com',
    status: 'New',
    potentialScore: 69
  },
  {
    handle: '@_TJRTrades',
    followerCount: 100000,
    profileUrl: 'https://x.com/_TJRTrades',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://tjrtrades.com',
    status: 'New',
    potentialScore: 67
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
  {
    handle: '@ForexTvOfficial',
    followerCount: 85000,
    profileUrl: 'https://x.com/ForexTvOfficial',
    bio: 'Forex trading and analysis. Technical analysis and market insights.',
    websiteUrl: 'https://forextvofficial.com',
    status: 'New',
    potentialScore: 71
  },
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
    handle: '@Rayner_Teo',
    followerCount: 180000,
    profileUrl: 'https://x.com/Rayner_Teo',
    bio: 'Forex trader and educator. Trading strategies and market analysis.',
    websiteUrl: 'https://raynerteo.com',
    status: 'New',
    potentialScore: 73
  },
  {
    handle: '@MMCrypto',
    followerCount: 250000,
    profileUrl: 'https://x.com/MMCrypto',
    bio: 'Cryptocurrency news and analysis. Bitcoin, Ethereum, and altcoin coverage.',
    websiteUrl: 'https://mmcrypto.io',
    status: 'New',
    potentialScore: 76
  },
  {
    handle: '@CryptoNobler',
    followerCount: 120000,
    profileUrl: 'https://x.com/CryptoNobler',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://cryptonobler.com',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@FXAlexGI',
    followerCount: 8500,
    profileUrl: 'https://x.com/FXAlexGI',
    bio: 'Forex and crypto trader. Technical analysis and market insights.',
    websiteUrl: 'https://fxalexgi.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@WatcherGuru',
    followerCount: 1500000,
    profileUrl: 'https://x.com/WatcherGuru',
    bio: 'Crypto news and updates. Blockchain technology and market analysis.',
    websiteUrl: 'https://watcherguru.com',
    status: 'New',
    potentialScore: 82
  },
  {
    handle: '@Investments_CEO',
    followerCount: 95000,
    profileUrl: 'https://x.com/Investments_CEO',
    bio: 'Investment analysis and insights. Financial markets and cryptocurrency.',
    websiteUrl: 'https://investmentsceo.com',
    status: 'New',
    potentialScore: 70
  },
  {
    handle: '@maxkeiser',
    followerCount: 900000,
    profileUrl: 'https://x.com/maxkeiser',
    bio: 'Bitcoin maximalist and financial commentator. Host of the Keiser Report.',
    websiteUrl: 'https://maxkeiser.com',
    status: 'New',
    potentialScore: 84
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
  {
    handle: '@cryptorecruitr',
    followerCount: 120000,
    profileUrl: 'https://x.com/cryptorecruitr',
    bio: 'Crypto recruitment and careers. Jobs and opportunities in blockchain.',
    websiteUrl: 'https://cryptorecruitr.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@_not_a_fish',
    followerCount: 85000,
    profileUrl: 'https://x.com/_not_a_fish',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://notafish.com',
    status: 'New',
    potentialScore: 69
  },
  {
    handle: '@Excellion',
    followerCount: 75000,
    profileUrl: 'https://x.com/Excellion',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://excellion.com',
    status: 'New',
    potentialScore: 67
  },
  {
    handle: '@ambaposh',
    followerCount: 65000,
    profileUrl: 'https://x.com/ambaposh',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://ambaposh.com',
    status: 'New',
    potentialScore: 65
  },
  {
    handle: '@APompliano',
    followerCount: 1300000,
    profileUrl: 'https://x.com/APompliano',
    bio: 'Morgan Creek Digital co-founder. Bitcoin and cryptocurrency advocate.',
    websiteUrl: 'https://morgancreekdigital.com',
    status: 'New',
    potentialScore: 88
  },
  {
    handle: '@CoinDesk',
    followerCount: 5200000,
    profileUrl: 'https://x.com/CoinDesk',
    bio: 'The latest blockchain news & crypto trends. Media platform covering cryptocurrency, DeFi, NFTs, and Web3 technologies.',
    websiteUrl: 'https://coindesk.com',
    status: 'New',
    potentialScore: 88
  },
  {
    handle: '@weirddalle',
    followerCount: 45000,
    profileUrl: 'https://x.com/weirddalle',
    bio: 'AI and crypto enthusiast. Exploring the intersection of artificial intelligence and blockchain.',
    websiteUrl: 'https://weirddalle.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@DailyPipsGU',
    followerCount: 38000,
    profileUrl: 'https://x.com/DailyPipsGU',
    bio: 'Forex and crypto trading signals. Daily market analysis.',
    websiteUrl: 'https://dailypipsgu.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@DisrespectedThe',
    followerCount: 32000,
    profileUrl: 'https://x.com/DisrespectedThe',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://disrespectedthe.com',
    status: 'New',
    potentialScore: 59
  },
  {
    handle: '@Oceanbreeze473',
    followerCount: 28000,
    profileUrl: 'https://x.com/Oceanbreeze473',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://oceanbreeze473.com',
    status: 'New',
    potentialScore: 57
  },
  {
    handle: '@shaunralston',
    followerCount: 25000,
    profileUrl: 'https://x.com/shaunralston',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://shaunralston.com',
    status: 'New',
    potentialScore: 56
  },
  {
    handle: '@Sut_401',
    followerCount: 22000,
    profileUrl: 'https://x.com/Sut_401',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://sut401.com',
    status: 'New',
    potentialScore: 55
  },
  {
    handle: '@BGatesIsaPyscho',
    followerCount: 18000,
    profileUrl: 'https://x.com/BGatesIsaPyscho',
    bio: 'Crypto analyst and commentator. Market analysis and insights.',
    websiteUrl: 'https://bgatesisapyscho.com',
    status: 'New',
    potentialScore: 54
  },
  {
    handle: '@MerlijnTheTrader',
    followerCount: 15000,
    profileUrl: 'https://x.com/MerlijnTheTrader',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://merlijnthetrader.com',
    status: 'New',
    potentialScore: 53
  },
  {
    handle: '@now_clarity',
    followerCount: 12000,
    profileUrl: 'https://x.com/now_clarity',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://nowclarity.com',
    status: 'New',
    potentialScore: 52
  },
  {
    handle: '@BigPopz72',
    followerCount: 10000,
    profileUrl: 'https://x.com/BigPopz72',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://bigpopz72.com',
    status: 'New',
    potentialScore: 51
  },
  {
    handle: '@apollonator3000',
    followerCount: 8500,
    profileUrl: 'https://x.com/apollonator3000',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://apollonator3000.com',
    status: 'New',
    potentialScore: 50
  },
  {
    handle: '@yourealazyfvck',
    followerCount: 7500,
    profileUrl: 'https://x.com/yourealazyfvck',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://yourealazyfvck.com',
    status: 'New',
    potentialScore: 49
  },
  {
    handle: '@PowerOfPositivity',
    followerCount: 5000000,
    profileUrl: 'https://x.com/PowerOfPositivity',
    bio: 'Positive thinking and motivation. Inspirational content and daily affirmations.',
    websiteUrl: 'https://powerofpositivity.com',
    status: 'New',
    potentialScore: 45
  },
  {
    handle: '@MeidasTouch',
    followerCount: 1200000,
    profileUrl: 'https://x.com/MeidasTouch',
    bio: 'Political commentary and analysis. Progressive news and insights.',
    websiteUrl: 'https://meidastouch.com',
    status: 'New',
    potentialScore: 42
  },
  {
    handle: '@Thomas738742961',
    followerCount: 8500,
    profileUrl: 'https://x.com/Thomas738742961',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://thomas738742961.com',
    status: 'New',
    potentialScore: 48
  },
  {
    handle: '@PeteTheTrainer',
    followerCount: 120000,
    profileUrl: 'https://x.com/PeteTheTrainer',
    bio: 'Fitness trainer and coach. Health and wellness content.',
    websiteUrl: 'https://petethetrainer.com',
    status: 'New',
    potentialScore: 38
  },
  {
    handle: '@LIVEpositivity',
    followerCount: 800000,
    profileUrl: 'https://x.com/LIVEpositivity',
    bio: 'Positive thinking and motivation. Inspirational content and daily affirmations.',
    websiteUrl: 'https://livepositivity.com',
    status: 'New',
    potentialScore: 44
  },
  {
    handle: '@LauraLoomer',
    followerCount: 450000,
    profileUrl: 'https://x.com/LauraLoomer',
    bio: 'Political commentator and journalist. Conservative news and analysis.',
    websiteUrl: 'https://lauraloomer.com',
    status: 'New',
    potentialScore: 41
  },
  {
    handle: '@PaulSzypula',
    followerCount: 250000,
    profileUrl: 'https://x.com/PaulSzypula',
    bio: 'Political commentator and analyst. News and current events.',
    websiteUrl: 'https://paulszypula.com',
    status: 'New',
    potentialScore: 39
  },
  {
    handle: '@RealRawNews1',
    followerCount: 180000,
    profileUrl: 'https://x.com/RealRawNews1',
    bio: 'News and current events. Breaking news and political analysis.',
    websiteUrl: 'https://realrawnews1.com',
    status: 'New',
    potentialScore: 37
  },
  {
    handle: '@RapidResponse47',
    followerCount: 120000,
    profileUrl: 'https://x.com/RapidResponse47',
    bio: 'Emergency response and news. Breaking news and current events.',
    websiteUrl: 'https://rapidresponse47.com',
    status: 'New',
    potentialScore: 35
  },
  {
    handle: '@lung_connect',
    followerCount: 85000,
    profileUrl: 'https://x.com/lung_connect',
    bio: 'Health and medical information. Lung health and respiratory care.',
    websiteUrl: 'https://lungconnect.com',
    status: 'New',
    potentialScore: 32
  },
  {
    handle: '@mymandefx',
    followerCount: 65000,
    profileUrl: 'https://x.com/mymandefx',
    bio: 'Forex trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://mymandefx.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@myproguy',
    followerCount: 55000,
    profileUrl: 'https://x.com/myproguy',
    bio: 'Programming and development. Software engineering and tech content.',
    websiteUrl: 'https://myproguy.com',
    status: 'New',
    potentialScore: 58
  },
  {
    handle: '@CryptoThro',
    followerCount: 45000,
    profileUrl: 'https://x.com/CryptoThro',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptothro.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@100xAltcoinGems',
    followerCount: 38000,
    profileUrl: 'https://x.com/100xAltcoinGems',
    bio: 'Altcoin gem hunter. Finding undervalued projects with high potential.',
    websiteUrl: 'https://100xaltcoingems.com',
    status: 'New',
    potentialScore: 66
  },
  {
    handle: '@CryptoJack',
    followerCount: 32000,
    profileUrl: 'https://x.com/CryptoJack',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptojack.com',
    status: 'New',
    potentialScore: 60
  },
  {
    handle: '@raynerhandel',
    followerCount: 28000,
    profileUrl: 'https://x.com/raynerhandel',
    bio: 'Forex trader and educator. Trading strategies and market analysis.',
    websiteUrl: 'https://raynerhandel.com',
    status: 'New',
    potentialScore: 64
  },
  {
    handle: '@TradersAcademyClub',
    followerCount: 25000,
    profileUrl: 'https://x.com/TradersAcademyClub',
    bio: 'Trading education and analysis. Forex and crypto trading strategies.',
    websiteUrl: 'https://tradersacademyclub.com',
    status: 'New',
    potentialScore: 62
  },
  {
    handle: '@TradingView',
    followerCount: 320000,
    profileUrl: 'https://x.com/TradingView',
    bio: 'Financial charts and trading platform. Tools for traders and investors.',
    websiteUrl: 'https://tradingview.com',
    status: 'New',
    potentialScore: 85
  },
  {
    handle: '@AltcoinBuzzIO',
    followerCount: 300000,
    profileUrl: 'https://x.com/AltcoinBuzzIO',
    bio: 'Cryptocurrency news and analysis. Altcoin coverage and market insights.',
    websiteUrl: 'https://altcoinbuzz.io',
    status: 'New',
    potentialScore: 77
  },
  {
    handle: '@josh_olszewicz',
    followerCount: 280000,
    profileUrl: 'https://x.com/josh_olszewicz',
    bio: 'Technical analyst and trader. Chart patterns and market analysis.',
    websiteUrl: 'https://josholszewicz.com',
    status: 'New',
    potentialScore: 83
  },
  {
    handle: '@Bitboy_Crypto',
    followerCount: 380000,
    profileUrl: 'https://x.com/Bitboy_Crypto',
    bio: 'Cryptocurrency news and analysis. Bitcoin, Ethereum, and altcoin coverage.',
    websiteUrl: 'https://bitboycrypto.com',
    status: 'New',
    potentialScore: 78
  },
  {
    handle: '@YTcryptoTrading',
    followerCount: 220000,
    profileUrl: 'https://x.com/YTcryptoTrading',
    bio: 'Crypto trading education and analysis. Technical analysis and market insights.',
    websiteUrl: 'https://ytcryptotrading.com',
    status: 'New',
    potentialScore: 75
  },
  {
    handle: '@MoonCarl',
    followerCount: 450000,
    profileUrl: 'https://x.com/MoonCarl',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://mooncarl.com',
    status: 'New',
    potentialScore: 81
  },
  {
    handle: '@scottmelker',
    followerCount: 750000,
    profileUrl: 'https://x.com/scottmelker',
    bio: 'The Wolf of All Streets. Crypto trader and analyst.',
    websiteUrl: 'https://thewolfofallstreets.com',
    status: 'New',
    potentialScore: 86
  },
  {
    handle: '@cryptomanran',
    followerCount: 400000,
    profileUrl: 'https://x.com/cryptomanran',
    bio: 'Crypto analyst and educator. Making complex crypto concepts simple.',
    websiteUrl: 'https://cryptomanran.com',
    status: 'New',
    potentialScore: 79
  },
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
    handle: '@forexblog9ja',
    followerCount: 45000,
    profileUrl: 'https://x.com/forexblog9ja',
    bio: 'Forex trading and analysis. Nigerian forex market insights.',
    websiteUrl: 'https://forexblog9ja.com',
    status: 'New',
    potentialScore: 61
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
  },
  {
    handle: '@TraderMHT',
    followerCount: 38000,
    profileUrl: 'https://x.com/TraderMHT',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://tradermht.com',
    status: 'New',
    potentialScore: 58
  },
  {
    handle: '@CEO_Investments',
    followerCount: 35000,
    profileUrl: 'https://x.com/CEO_Investments',
    bio: 'Investment analysis and insights. Financial markets and cryptocurrency.',
    websiteUrl: 'https://ceoinvestments.com',
    status: 'New',
    potentialScore: 60
  },
  {
    handle: '@tradesviz',
    followerCount: 32000,
    profileUrl: 'https://x.com/tradesviz',
    bio: 'Trading visualization and analysis. Portfolio tracking and insights.',
    websiteUrl: 'https://tradesviz.com',
    status: 'New',
    potentialScore: 57
  },
  {
    handle: '@TraderDivergent',
    followerCount: 28000,
    profileUrl: 'https://x.com/TraderDivergent',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://traderdivergent.com',
    status: 'New',
    potentialScore: 56
  },
  {
    handle: '@HYDRA_Thahmid',
    followerCount: 25000,
    profileUrl: 'https://x.com/HYDRA_Thahmid',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://hydrathahmid.com',
    status: 'New',
    potentialScore: 55
  },
  {
    handle: '@daytradingrauf',
    followerCount: 22000,
    profileUrl: 'https://x.com/daytradingrauf',
    bio: 'Day trading and analysis. Technical analysis and market insights.',
    websiteUrl: 'https://daytradingrauf.com',
    status: 'New',
    potentialScore: 54
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
    handle: '@0xPolygon',
    followerCount: 2200000,
    profileUrl: 'https://x.com/0xPolygon',
    bio: 'Polygon - Ethereum\'s Internet of Blockchains. Scaling Ethereum for mass adoption.',
    websiteUrl: 'https://polygon.technology',
    status: 'New',
    potentialScore: 89
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
    handle: '@CryptoDonAlt',
    followerCount: 160000,
    profileUrl: 'https://x.com/CryptoDonAlt',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptodonalt.com',
    status: 'New',
    potentialScore: 76
  },
  {
    handle: '@CryptoNewton',
    followerCount: 120000,
    profileUrl: 'https://x.com/CryptoNewton',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptonewton.com',
    status: 'New',
    potentialScore: 73
  },
  {
    handle: '@CryptoMafia420',
    followerCount: 100000,
    profileUrl: 'https://x.com/CryptoMafia420',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptomafia420.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@Looks_Rekt',
    followerCount: 85000,
    profileUrl: 'https://x.com/Looks_Rekt',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://looksrekt.com',
    status: 'New',
    potentialScore: 69
  },
  {
    handle: '@MoonDevOnYT',
    followerCount: 75000,
    profileUrl: 'https://x.com/MoonDevOnYT',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://moodevonyt.com',
    status: 'New',
    potentialScore: 67
  },
  {
    handle: '@PolyWhaleWatch',
    followerCount: 65000,
    profileUrl: 'https://x.com/PolyWhaleWatch',
    bio: 'Polygon ecosystem whale watching. Large transactions and market insights.',
    websiteUrl: 'https://polywhalewatch.com',
    status: 'New',
    potentialScore: 65
  },
  {
    handle: '@stackhodler',
    followerCount: 55000,
    profileUrl: 'https://x.com/stackhodler',
    bio: 'Bitcoin and crypto HODLer. Long-term investment strategies and analysis.',
    websiteUrl: 'https://stackhodler.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@Xfinancebull',
    followerCount: 45000,
    profileUrl: 'https://x.com/Xfinancebull',
    bio: 'Financial analysis and trading. Market insights and investment strategies.',
    websiteUrl: 'https://xfinancebull.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@ProofOfMoney',
    followerCount: 35000,
    profileUrl: 'https://x.com/ProofOfMoney',
    bio: 'Bitcoin and cryptocurrency analysis. Monetary theory and market insights.',
    websiteUrl: 'https://proofofmoney.com',
    status: 'New',
    potentialScore: 59
  },
  {
    handle: '@ProfessorB21',
    followerCount: 28000,
    profileUrl: 'https://x.com/ProfessorB21',
    bio: 'Bitcoin and cryptocurrency education. Technical analysis and market insights.',
    websiteUrl: 'https://professorb21.com',
    status: 'New',
    potentialScore: 57
  },
  {
    handle: '@jacqmelinek',
    followerCount: 25000,
    profileUrl: 'https://x.com/jacqmelinek',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://jacqmelinek.com',
    status: 'New',
    potentialScore: 56
  },
  {
    handle: '@pdicarlotrader',
    followerCount: 22000,
    profileUrl: 'https://x.com/pdicarlotrader',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://pdicarlotrader.com',
    status: 'New',
    potentialScore: 55
  },
  {
    handle: '@SahilBloom',
    followerCount: 450000,
    profileUrl: 'https://x.com/SahilBloom',
    bio: 'Business and finance content. Entrepreneurship and investment insights.',
    websiteUrl: 'https://sahilbloom.com',
    status: 'New',
    potentialScore: 72
  },
  {
    handle: '@InterestingSTEM',
    followerCount: 350000,
    profileUrl: 'https://x.com/InterestingSTEM',
    bio: 'Science and technology content. Educational and informative posts.',
    websiteUrl: 'https://interestingstem.com',
    status: 'New',
    potentialScore: 68
  },
  {
    handle: '@jiratickets',
    followerCount: 280000,
    profileUrl: 'https://x.com/jiratickets',
    bio: 'Travel and lifestyle content. Adventure and exploration.',
    websiteUrl: 'https://jiratickets.com',
    status: 'New',
    potentialScore: 41
  },
  {
    handle: '@BoldBitcoin',
    followerCount: 180000,
    profileUrl: 'https://x.com/BoldBitcoin',
    bio: 'Bitcoin advocate and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://boldbitcoin.com',
    status: 'New',
    potentialScore: 74
  },
  {
    handle: '@Gordon',
    followerCount: 120000,
    profileUrl: 'https://x.com/Gordon',
    bio: 'Gordon Gekko character. Financial markets and trading insights.',
    websiteUrl: 'https://gordon.com',
    status: 'New',
    potentialScore: 38
  },
  {
    handle: '@BennyAtTheBank',
    followerCount: 95000,
    profileUrl: 'https://x.com/BennyAtTheBank',
    bio: 'Banking and finance content. Financial education and insights.',
    websiteUrl: 'https://bennyatthebank.com',
    status: 'New',
    potentialScore: 35
  },
  {
    handle: '@AltcoinGordon',
    followerCount: 85000,
    profileUrl: 'https://x.com/AltcoinGordon',
    bio: 'Altcoin analysis and trading. Technical analysis and market insights.',
    websiteUrl: 'https://altcoingordon.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@AlpineAnalyst',
    followerCount: 75000,
    profileUrl: 'https://x.com/AlpineAnalyst',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://alpineanalyst.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@Altcoin_Media',
    followerCount: 65000,
    profileUrl: 'https://x.com/Altcoin_Media',
    bio: 'Altcoin news and analysis. Cryptocurrency market insights.',
    websiteUrl: 'https://altcoinmedia.com',
    status: 'New',
    potentialScore: 59
  },
  {
    handle: '@CryptoGeekNews',
    followerCount: 55000,
    profileUrl: 'https://x.com/CryptoGeekNews',
    bio: 'Crypto news and analysis. Technology and blockchain insights.',
    websiteUrl: 'https://cryptogeeknews.com',
    status: 'New',
    potentialScore: 57
  },
  {
    handle: '@genelambo',
    followerCount: 45000,
    profileUrl: 'https://x.com/genelambo',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://genelambo.com',
    status: 'New',
    potentialScore: 55
  },
  {
    handle: '@decenntrahq',
    followerCount: 35000,
    profileUrl: 'https://x.com/decenntrahq',
    bio: 'DeFi and Web3 development. Blockchain technology and insights.',
    websiteUrl: 'https://decenntrahq.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@kgen',
    followerCount: 28000,
    profileUrl: 'https://x.com/kgen',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://kgen.com',
    status: 'New',
    potentialScore: 56
  },
  {
    handle: '@CryptoCapo_',
    followerCount: 25000,
    profileUrl: 'https://x.com/CryptoCapo_',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptocapo.com',
    status: 'New',
    potentialScore: 54
  },
  {
    handle: '@CryptoA40672341',
    followerCount: 22000,
    profileUrl: 'https://x.com/CryptoA40672341',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptoa40672341.com',
    status: 'New',
    potentialScore: 53
  },
  {
    handle: '@DeFinvestor',
    followerCount: 18000,
    profileUrl: 'https://x.com/DeFinvestor',
    bio: 'DeFi analysis and investment. Decentralized finance insights.',
    websiteUrl: 'https://definvestor.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@HouseofXRP',
    followerCount: 15000,
    profileUrl: 'https://x.com/HouseofXRP',
    bio: 'XRP community and analysis. Ripple and XRP market insights.',
    websiteUrl: 'https://houseofxrp.com',
    status: 'New',
    potentialScore: 58
  },
  {
    handle: '@port3',
    followerCount: 12000,
    profileUrl: 'https://x.com/port3',
    bio: 'Web3 infrastructure and development. Blockchain technology and insights.',
    websiteUrl: 'https://port3.to',
    status: 'New',
    potentialScore: 56
  },
  {
    handle: '@bascanio',
    followerCount: 10000,
    profileUrl: 'https://x.com/bascanio',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://bascanio.com',
    status: 'New',
    potentialScore: 54
  },
  {
    handle: '@0x2cc88fe15206f7bbf323aebecc7e1784f50d497a',
    followerCount: 8500,
    profileUrl: 'https://x.com/0x2cc88fe15206f7bbf323aebecc7e1784f50d497a',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://0x2cc88fe15206f7bbf323aebecc7e1784f50d497a.com',
    status: 'New',
    potentialScore: 52
  },
  {
    handle: '@nft_cryptogang',
    followerCount: 7500,
    profileUrl: 'https://x.com/nft_cryptogang',
    bio: 'NFT collector and analyst. Digital art and blockchain collectibles.',
    websiteUrl: 'https://nftcryptogang.com',
    status: 'New',
    potentialScore: 50
  },
  {
    handle: '@CryptoGangNFT',
    followerCount: 6500,
    profileUrl: 'https://x.com/CryptoGangNFT',
    bio: 'NFT collector and analyst. Digital art and blockchain collectibles.',
    websiteUrl: 'https://cryptogangnft.com',
    status: 'New',
    potentialScore: 48
  },
  {
    handle: '@airkeson1998',
    followerCount: 5500,
    profileUrl: 'https://x.com/airkeson1998',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://airkeson1998.com',
    status: 'New',
    potentialScore: 46
  },
  {
    handle: '@CryptoMafia420',
    followerCount: 100000,
    profileUrl: 'https://x.com/CryptoMafia420',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://cryptomafia420.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@DonAlt',
    followerCount: 85000,
    profileUrl: 'https://x.com/DonAlt',
    bio: 'Crypto analyst and trader. Technical analysis and market insights.',
    websiteUrl: 'https://donalt.com',
    status: 'New',
    potentialScore: 73
  },
  {
    handle: '@AarushSelvan',
    followerCount: 75000,
    profileUrl: 'https://x.com/AarushSelvan',
    bio: 'Crypto analyst and researcher. Deep dives into projects and market trends.',
    websiteUrl: 'https://aarushselvan.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@nickbakeddesign',
    followerCount: 65000,
    profileUrl: 'https://x.com/nickbakeddesign',
    bio: 'Design and creative content. UI/UX and digital art.',
    websiteUrl: 'https://nickbakeddesign.com',
    status: 'New',
    potentialScore: 38
  },
  {
    handle: '@bchesky',
    followerCount: 55000,
    profileUrl: 'https://x.com/bchesky',
    bio: 'Airbnb co-founder. Business insights and entrepreneurship.',
    websiteUrl: 'https://bchesky.com',
    status: 'New',
    potentialScore: 35
  },
  {
    handle: '@bitcointazz',
    followerCount: 45000,
    profileUrl: 'https://x.com/bitcointazz',
    bio: 'Bitcoin analysis and trading. Technical analysis and market insights.',
    websiteUrl: 'https://bitcointazz.com',
    status: 'New',
    potentialScore: 63
  },
  {
    handle: '@MerlinTrader',
    followerCount: 35000,
    profileUrl: 'https://x.com/MerlinTrader',
    bio: 'Crypto trader and analyst. Technical analysis and market insights.',
    websiteUrl: 'https://merlintrader.com',
    status: 'New',
    potentialScore: 61
  },
  {
    handle: '@ForesTvOfficial',
    followerCount: 25000,
    profileUrl: 'https://x.com/ForesTvOfficial',
    bio: 'Forex trading and analysis. Technical analysis and market insights.',
    websiteUrl: 'https://forestvofficial.com',
    status: 'New',
    potentialScore: 59
  },
  {
    handle: '@DecentraHQ',
    followerCount: 22000,
    profileUrl: 'https://x.com/DecentraHQ',
    bio: 'DeFi and Web3 development. Blockchain technology and insights.',
    websiteUrl: 'https://decentrahq.com',
    status: 'New',
    potentialScore: 57
  },
  {
    handle: '@BullrunnersHQ',
    followerCount: 18000,
    profileUrl: 'https://x.com/BullrunnersHQ',
    bio: 'Crypto bull run analysis. Market insights and trading strategies.',
    websiteUrl: 'https://bullrunnershq.com',
    status: 'New',
    potentialScore: 55
  },
  {
    handle: '@QuantenTrader',
    followerCount: 15000,
    profileUrl: 'https://x.com/QuantenTrader',
    bio: 'Quantitative trading and analysis. Algorithmic trading strategies.',
    websiteUrl: 'https://quantentrader.com',
    status: 'New',
    potentialScore: 58
  },
  {
    handle: '@AltcoinExpert',
    followerCount: 12000,
    profileUrl: 'https://x.com/AltcoinExpert',
    bio: 'Altcoin analysis and trading. Technical analysis and market insights.',
    websiteUrl: 'https://altcoinexpert.com',
    status: 'New',
    potentialScore: 56
  },
  {
    handle: '@NFTradeOfficial',
    followerCount: 10000,
    profileUrl: 'https://x.com/NFTradeOfficial',
    bio: 'NFT trading and analysis. Digital collectibles and market insights.',
    websiteUrl: 'https://nftradeofficial.com',
    status: 'New',
    potentialScore: 54
  },
  {
    handle: '@FerroProtocol',
    followerCount: 8500,
    profileUrl: 'https://x.com/FerroProtocol',
    bio: 'DeFi protocol and development. Blockchain technology and insights.',
    websiteUrl: 'https://ferroprotocol.com',
    status: 'New',
    potentialScore: 52
  },
  {
    handle: '@TradeFiOfficial',
    followerCount: 7500,
    profileUrl: 'https://x.com/TradeFiOfficial',
    bio: 'TradeFi and DeFi development. Blockchain technology and insights.',
    websiteUrl: 'https://tradefiofficial.com',
    status: 'New',
    potentialScore: 50
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
    handle: '@Bitcoin_Expert',
    followerCount: 65000,
    profileUrl: 'https://x.com/Bitcoin_Expert',
    bio: 'Bitcoin analysis and trading. Technical analysis and market insights.',
    websiteUrl: 'https://bitcoinexpert.com',
    status: 'New',
    potentialScore: 71
  },
  {
    handle: '@EthereumMax',
    followerCount: 55000,
    profileUrl: 'https://x.com/EthereumMax',
    bio: 'Ethereum analysis and trading. Technical analysis and market insights.',
    websiteUrl: 'https://ethereummax.com',
    status: 'New',
    potentialScore: 68
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
    handle: '@CryptoChicOfficial',
    followerCount: 35000,
    profileUrl: 'https://x.com/CryptoChicOfficial',
    bio: 'Crypto fashion and lifestyle. Digital art and blockchain collectibles.',
    websiteUrl: 'https://cryptochicofficial.com',
    status: 'New',
    potentialScore: 59
  },
  {
    handle: '@web3swift',
    followerCount: 28000,
    profileUrl: 'https://x.com/web3swift',
    bio: 'Web3 development and Swift programming. Blockchain technology and insights.',
    websiteUrl: 'https://web3swift.com',
    status: 'New',
    potentialScore: 61
  },
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
    handle: '@DeFiPulse',
    followerCount: 320000,
    profileUrl: 'https://x.com/DeFiPulse',
    bio: 'DeFi analytics and ranking platform. Track decentralized finance protocols.',
    websiteUrl: 'https://defipulse.com',
    status: 'New',
    potentialScore: 80
  },
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
    handle: '@PTC_Crypto',
    followerCount: 55000,
    profileUrl: 'https://x.com/PTC_Crypto',
    bio: 'Cryptocurrency news and analysis. Technical analysis and market insights.',
    websiteUrl: 'https://ptccrypto.com',
    status: 'New',
    potentialScore: 71
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
  }
]

export async function POST() {
  try {
    // Clear existing influencers
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
