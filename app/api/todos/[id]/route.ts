import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body: Partial<{ title: string; deadline: string; priority: string; completed: boolean }> =
    await request.json()

  await getSql()`
    UPDATE todos SET
      title     = COALESCE(${body.title     ?? null}, title),
      deadline  = COALESCE(${body.deadline  ?? null}, deadline),
      priority  = COALESCE(${body.priority  ?? null}, priority),
      completed = COALESCE(${body.completed ?? null}, completed)
    WHERE id = ${id}
  `
  return NextResponse.json({ ok: true })
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await getSql()`DELETE FROM todos WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}
