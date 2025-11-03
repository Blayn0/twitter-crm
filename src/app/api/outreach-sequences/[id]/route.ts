import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const sequence = await db.outreachSequence.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      },
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' }
        }
      }
    })

    return NextResponse.json(sequence)
  } catch (error) {
    console.error('Error updating outreach sequence:', error)
    return NextResponse.json(
      { error: 'Failed to update outreach sequence' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.outreachSequence.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting outreach sequence:', error)
    return NextResponse.json(
      { error: 'Failed to delete outreach sequence' },
      { status: 500 }
    )
  }
}