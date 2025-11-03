import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const sequences = await db.outreachSequence.findMany({
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(sequences)
  } catch (error) {
    console.error('Error fetching outreach sequences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch outreach sequences' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const sequence = await db.outreachSequence.create({
      data: {
        name: data.name,
        description: data.description,
        isActive: data.isActive ?? true
      },
      include: {
        steps: true
      }
    })

    return NextResponse.json(sequence, { status: 201 })
  } catch (error) {
    console.error('Error creating outreach sequence:', error)
    return NextResponse.json(
      { error: 'Failed to create outreach sequence' },
      { status: 500 }
    )
  }
}