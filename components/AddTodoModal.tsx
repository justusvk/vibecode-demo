'use client'

import { useState } from 'react'
import { Priority, Todo } from '@/lib/types'

interface Props {
  onSave: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void
  onClose: () => void
  initialTodo?: Pick<Todo, 'title' | 'deadline' | 'priority'>
}

const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'Hoog',
  medium: 'Medium',
  low: 'Laag',
}

const PRIORITY_COLORS: Record<Priority, string> = {
  high: 'border-red-400 bg-red-50 text-red-700',
  medium: 'border-orange-400 bg-orange-50 text-orange-700',
  low: 'border-blue-400 bg-blue-50 text-blue-700',
}

export default function AddTodoModal({ onSave, onClose, initialTodo }: Props) {
  const [title, setTitle] = useState(initialTodo?.title ?? '')
  const [deadline, setDeadline] = useState(initialTodo?.deadline ?? '')
  const [priority, setPriority] = useState<Priority>(initialTodo?.priority ?? 'medium')
  const [error, setError] = useState('')
  const isEditing = !!initialTodo

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Vul een titel in.')
      return
    }
    if (!deadline) {
      setError('Stel een deadline in.')
      return
    }
    onSave({ title: title.trim(), deadline, priority })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 mx-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5">{isEditing ? 'Taak bewerken' : 'Nieuwe taak'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError('') }}
              placeholder="Wat moet je doen?"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
              autoFocus
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => { setDeadline(e.target.value); setError('') }}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioriteit
            </label>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-all ${
                    priority === p
                      ? PRIORITY_COLORS[p] + ' shadow-sm scale-105'
                      : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {PRIORITY_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-violet-500 px-4 py-2 text-white font-semibold hover:bg-violet-600 transition-colors"
            >
              {isEditing ? 'Opslaan' : 'Toevoegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
