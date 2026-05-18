export type Priority = 'high' | 'medium' | 'low'
export type FilterState = 'all' | 'active' | 'completed'
export type SortBy = 'deadline' | 'priority' | 'created'

export interface Todo {
  id: string
  title: string
  deadline: string // ISO date string YYYY-MM-DD
  priority: Priority
  completed: boolean
  createdAt: string
}
