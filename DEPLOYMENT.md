# Twitter CRM - Deployment Guide

## Local Development
```bash
# Use local SQLite database
npm run build:local
npm run dev
```

## Netlify Deployment
```bash
# Setup environment variables in Netlify dashboard:
# DATABASE_URL - PostgreSQL connection string (required for production)
# NEXTAUTH_URL - https://your-app.netlify.app
# NEXTAUTH_SECRET - Random string for authentication
# NETLIFY=true

# Build and deploy
npm run build:netlify
```

## Database Setup

### Local Development
- Uses SQLite with `prisma/schema-local.prisma`
- Database file: `prisma/db/custom.db`
- Auto-generated on first run

### Netlify Production
- Requires PostgreSQL database
- Uses `prisma/schema-netlify.prisma`
- Set DATABASE_URL environment variable in Netlify dashboard

## Free PostgreSQL Options for Netlify

1. **Supabase** (Recommended)
   - Free tier available
   - Provides connection string
   - Set DATABASE_URL in Netlify environment

2. **Neon.tech**
   - Free tier with serverless support
   - Auto-scaling capabilities

3. **PlanetScale**
   - Free tier available
   - MySQL compatible

## Environment Variables

### Required for Netlify:
```
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_URL=https://twitcrm.netlify.app
NEXTAUTH_SECRET=your-random-secret-string
NETLIFY=true
```

## Build Process

### Netlify Build
1. Copies PostgreSQL schema to main schema file
2. Generates Prisma client
3. Builds Next.js application
4. Deploys to Netlify Functions

### Local Build
1. Copies SQLite schema to main schema file
2. Generates Prisma client
3. Builds for local development

## Troubleshooting

### 500 Errors on Netlify
1. Check DATABASE_URL environment variable
2. Ensure PostgreSQL database is accessible
3. Verify Prisma client generation
4. Check Netlify function logs

### Database Connection Issues
1. Verify connection string format
2. Check database server status
3. Ensure proper permissions
4. Test with Prisma CLI: `npx prisma db pull`
# Deployment timestamp: Mon Nov  3 23:25:48 SAST 2025
