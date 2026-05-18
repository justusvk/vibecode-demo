'use client'

import { useEffect, useState, useMemo } from 'react'
import { FilterState, Priority, SortBy, Todo } from '@/lib/types'
import AddTodoModal from '@/components/AddTodoModal'
import TodoList from '@/components/TodoList'

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

const FILTER_LABELS: Record<FilterState, string> = {
  all: 'Alles',
  active: 'Actief',
  completed: 'Voltooid',
}

const SORT_LABELS: Record<SortBy, string> = {
  deadline: 'Deadline',
  priority: 'Prioriteit',
  created: 'Aangemaakt',
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterState>('all')
  const [sortBy, setSortBy] = useState<SortBy>('deadline')
  const [showModal, setShowModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/todos')
      .then((r) => r.json())
      .then((data: Todo[]) => { setTodos(data); setLoading(false) })
  }, [])

  function handleAdd(data: Omit<Todo, 'id' | 'createdAt' | 'completed'>) {
    const newTodo: Todo = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completed: false,
    }
    setTodos((prev) => [newTodo, ...prev])
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
  }

  function handleEdit(data: Omit<Todo, 'id' | 'createdAt' | 'completed'>) {
    if (!editingTodo) return
    setTodos((prev) =>
      prev.map((t) => (t.id === editingTodo.id ? { ...t, ...data } : t))
    )
    fetch(`/api/todos/${editingTodo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  function openEdit(todo: Todo) {
    setEditingTodo(todo)
  }

  function closeModal() {
    setShowModal(false)
    setEditingTodo(null)
  }

  function handleToggle(id: string) {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    fetch(`/api/todos/${id}`, { method: 'DELETE' })
  }

  const filtered = useMemo(() => {
    let list = todos
    if (filter === 'active') list = list.filter((t) => !t.completed)
    if (filter === 'completed') list = list.filter((t) => t.completed)

    return [...list].sort((a, b) => {
      if (sortBy === 'deadline') return a.deadline.localeCompare(b.deadline)
      if (sortBy === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      return b.createdAt.localeCompare(a.createdAt)
    })
  }, [todos, filter, sortBy])

  const activeCounts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  const todayStr = new Date().toISOString().slice(0, 10)
  const createdToday = todos.filter((t) => t.createdAt.slice(0, 10) === todayStr).length

  if (loading) {
    return (
      <main className="min-h-screen bg-linear-to-br from-violet-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Laden...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-violet-50 via-pink-50 to-orange-50">
      <div className="mx-auto max-w-2xl px-4 py-10">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Mijn Taken
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {activeCounts.active} actief · {activeCounts.completed} voltooid · <span className="text-violet-400 font-medium">{createdToday} vandaag aangemaakt</span>
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-white font-semibold shadow-lg shadow-violet-200 hover:bg-violet-600 transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-lg leading-none">+</span>
            <span>Nieuwe taak</span>
          </button>
        </div>

        {/* Controls */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {/* Filter tabs */}
          <div className="flex rounded-xl bg-white shadow-sm p-1 gap-1">
            {(['all', 'active', 'completed'] as FilterState[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-violet-500 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {FILTER_LABELS[f]}
                <span className={`ml-1.5 text-xs ${filter === f ? 'text-violet-200' : 'text-gray-400'}`}>
                  {activeCounts[f]}
                </span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Sorteer op</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              {(['deadline', 'priority', 'created'] as SortBy[]).map((s) => (
                <option key={s} value={s}>{SORT_LABELS[s]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* List */}
        <TodoList todos={filtered} onToggle={handleToggle} onDelete={handleDelete} onEdit={openEdit} />
      </div>

      {showModal && (
        <AddTodoModal onSave={handleAdd} onClose={closeModal} />
      )}

      {editingTodo && (
        <AddTodoModal
          onSave={handleEdit}
          onClose={closeModal}
          initialTodo={editingTodo}
        />
      )}
    </main>
  )
}
