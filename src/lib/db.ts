import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Database configuration for different environments
const getDatabaseUrl = () => {
  if (process.env.NETLIFY === 'true') {
    // For Netlify, we need to use a cloud database
    // This is a placeholder - in production, you'd use a real cloud DB
    return process.env.DATABASE_URL || 'file:./prisma/db/custom.db'
  }
  return process.env.DATABASE_URL || 'file:./prisma/db/custom.db'
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl()
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
