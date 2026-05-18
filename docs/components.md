# Componenten

Alle componenten zijn `'use client'` en staan in de map `components/`.

---

## TodoList

`components/TodoList.tsx`

Rendert een verticale lijst van `TodoItem`-componenten. Toont een lege staat wanneer er geen taken zijn.

**Props**

| Prop | Type | Beschrijving |
|------|------|--------------|
| `todos` | `Todo[]` | Gefilterde en gesorteerde takenwlijst |
| `onToggle` | `(id: string) => void` | Callback bij toggling voltooid/actief |
| `onDelete` | `(id: string) => void` | Callback bij verwijderen |
| `onEdit` | `(todo: Todo) => void` | Callback bij bewerken — opent de modal in `page.tsx` |

---

## TodoItem

`components/TodoItem.tsx`

Rendert één taak-rij. Bevat een checkbox, titel, prioriteitsbadge, deadlinebadge en actieknoppen.

**Props**

| Prop | Type | Beschrijving |
|------|------|--------------|
| `todo` | `Todo` | De te renderen taak |
| `onToggle` | `(id: string) => void` | |
| `onDelete` | `(id: string) => void` | |
| `onEdit` | `(todo: Todo) => void` | |

**Deadlinebadge logica** (`getDeadlineLabel`)

| Situatie | Label | Kleur |
|----------|-------|-------|
| Verlopen | "Verlopen" | rood |
| Vandaag | "Vandaag" | oranje |
| Morgen | "Morgen" | geel |
| ≤ 7 dagen | `{n}d` | groen |
| \> 7 dagen | bijv. "23 mei" | grijs |

Bij voltooide taken wordt de deadlinebadge niet getoond.

**Verwijder-bevestiging**

Bij klikken op de prullenbak-knop wordt een inline bevestiging getoond ("Verwijder / Nee") om per ongeluk verwijderen te voorkomen.

---

## AddTodoModal

`components/AddTodoModal.tsx`

Modaal formulier voor zowel het **aanmaken** als **bewerken** van een taak. Gedrag verschilt op basis van de aanwezigheid van `initialTodo`.

**Props**

| Prop | Type | Beschrijving |
|------|------|--------------|
| `onSave` | `(todo: Omit<Todo, 'id' \| 'createdAt' \| 'completed'>) => void` | Callback met de ingevulde velden |
| `onClose` | `() => void` | Sluit de modal |
| `initialTodo` | `Pick<Todo, 'title' \| 'deadline' \| 'priority'>` (optioneel) | Vult de velden voor bij bewerken |

**Validatie**

- Titel is verplicht (client-side melding).
- Deadline is verplicht (client-side melding).
- Prioriteit heeft `'medium'` als standaardwaarde.

Klikken buiten het modaalvenster sluit het (click-outside handler op de overlay).

---

## Types (`lib/types.ts`)

```ts
export type Priority    = 'high' | 'medium' | 'low'
export type FilterState = 'all' | 'active' | 'completed'
export type SortBy      = 'deadline' | 'priority' | 'created'

export interface Todo {
  id:        string
  title:     string
  deadline:  string   // YYYY-MM-DD
  priority:  Priority
  completed: boolean
  createdAt: string   // ISO 8601
}
```
