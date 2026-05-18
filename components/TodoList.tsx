'use client'

import { Todo } from '@/lib/types'
import TodoItem from './TodoItem'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <p className="text-gray-400 text-sm font-medium">Geen taken gevonden</p>
        <p className="text-gray-300 text-xs mt-1">Voeg een nieuwe taak toe om te beginnen</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}
