'use client'

import { useState } from 'react'
import { Priority, Todo } from '@/lib/types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

const PRIORITY_BADGE: Record<Priority, string> = {
  high: 'bg-red-100 text-red-600 border border-red-200',
  medium: 'bg-orange-100 text-orange-600 border border-orange-200',
  low: 'bg-blue-100 text-blue-600 border border-blue-200',
}

const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'Hoog',
  medium: 'Medium',
  low: 'Laag',
}

function getDeadlineLabel(dateStr: string): { label: string; color: string } | null {
  if (!dateStr) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadline = new Date(dateStr + 'T00:00:00')

  const diff = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diff < 0) return { label: 'Verlopen', color: 'bg-red-100 text-red-600 border border-red-200' }
  if (diff === 0) return { label: 'Vandaag', color: 'bg-orange-100 text-orange-600 border border-orange-200' }
  if (diff === 1) return { label: 'Morgen', color: 'bg-yellow-100 text-yellow-600 border border-yellow-200' }
  if (diff <= 7) return { label: `${diff}d`, color: 'bg-emerald-100 text-emerald-600 border border-emerald-200' }

  const d = new Date(dateStr + 'T00:00:00')
  return {
    label: d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' }),
    color: 'bg-gray-100 text-gray-500 border border-gray-200',
  }
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const deadlineInfo = getDeadlineLabel(todo.deadline)

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
        todo.completed ? 'bg-gray-50 opacity-60' : 'bg-white shadow-sm hover:shadow-md'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-violet-400 border-violet-400'
            : 'border-gray-300 hover:border-violet-400'
        }`}
        aria-label={todo.completed ? 'Markeer als actief' : 'Markeer als voltooid'}
      >
        {todo.completed && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Title */}
      <span
        className={`flex-1 text-sm font-medium text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}
      >
        {todo.title}
      </span>

      {/* Chips */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${PRIORITY_BADGE[todo.priority]}`}>
          {PRIORITY_LABELS[todo.priority]}
        </span>

        {deadlineInfo && !todo.completed && (
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${deadlineInfo.color}`}>
            {deadlineInfo.label}
          </span>
        )}
      </div>

      {/* Actions */}
      {confirmDelete ? (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onDelete(todo.id)}
            className="rounded-lg bg-red-500 px-2 py-1 text-xs text-white font-semibold hover:bg-red-600"
          >
            Verwijder
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200"
          >
            Nee
          </button>
        </div>
      ) : (
        <div className="shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(todo)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-violet-500"
            aria-label="Bewerk taak"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-400"
            aria-label="Verwijder taak"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
