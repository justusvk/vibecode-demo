# Architectuur

## Stack

| Laag | Technologie |
|------|-------------|
| Framework | Next.js 16 (App Router) |
| Taal | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Database | Neon serverless Postgres (`@neondatabase/serverless`) |

## Mappenstructuur

```
app/
  layout.tsx          # Root layout — fonts, metadata, body wrapper
  page.tsx            # Enige pagina: bevat alle staat + business logic
  globals.css         # Tailwind base styles
  api/
    todos/
      route.ts        # GET /api/todos, POST /api/todos
      [id]/
        route.ts      # PATCH /api/todos/:id, DELETE /api/todos/:id

components/
  TodoList.tsx        # Renders lijst van TodoItem's, of lege staat
  TodoItem.tsx        # Enkele taak-rij met acties
  AddTodoModal.tsx    # Modal voor aanmaken én bewerken van taken

lib/
  types.ts            # Gedeelde TypeScript-types (Todo, Priority, …)
  db.ts               # Neon SQL-client singleton
```

## Dataflow

```
page.tsx (client state)
  │
  ├── fetch('/api/todos')          → GET    → Neon DB
  ├── fetch('/api/todos', POST)    → POST   → Neon DB
  ├── fetch('/api/todos/:id', PATCH)         → PATCH  → Neon DB
  └── fetch('/api/todos/:id', DELETE)        → DELETE → Neon DB
```

State leeft uitsluitend in `page.tsx`. Bij elke mutatie wordt de lokale state **optimistisch** bijgewerkt (vóórdat de API-call terugkeert), zodat de UI direct reageert.

## Database

Tabel `todos` in Neon Postgres:

```sql
CREATE TABLE todos (
  id         TEXT PRIMARY KEY,       -- UUID gegenereerd op de client
  title      TEXT NOT NULL,
  deadline   TEXT NOT NULL,          -- YYYY-MM-DD
  priority   TEXT NOT NULL,          -- 'high' | 'medium' | 'low'
  completed  BOOLEAN NOT NULL DEFAULT false,
  created_at TEXT NOT NULL           -- ISO 8601 timestamp
);
```

De database-verbinding wordt geconfigureerd via de omgevingsvariabele `DATABASE_URL`. Zie [`.env.example`](../.env.example).

## Omgevingsvariabelen

| Variabele | Verplicht | Beschrijving |
|-----------|-----------|--------------|
| `DATABASE_URL` | Ja | Neon connection string (inclusief `?sslmode=require`) |
