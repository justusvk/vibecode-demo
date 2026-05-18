import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { Todo } from '@/lib/types'

export async function GET() {
  const rows = await getSql()`SELECT * FROM todos ORDER BY created_at DESC`
  const todos: Todo[] = rows.map((r) => ({
    id: r.id as string,
    title: r.title as string,
    deadline: r.deadline as string,
    priority: r.priority as Todo['priority'],
    completed: r.completed as boolean,
    createdAt: r.created_at as string,
  }))
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const todo: Todo = await request.json()
  await getSql()`
    INSERT INTO todos (id, title, deadline, priority, completed, created_at)
    VALUES (${todo.id}, ${todo.title}, ${todo.deadline}, ${todo.priority}, ${todo.completed}, ${todo.createdAt})
  `
  return NextResponse.json({ ok: true })
}
