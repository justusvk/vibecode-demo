# API-referentie

Alle endpoints zitten onder `/api/todos` en werken met JSON.

---

## GET /api/todos

Haalt alle taken op, gesorteerd op aanmaakdatum (nieuwste eerst).

**Response `200`**

```json
[
  {
    "id": "uuid",
    "title": "Rapport afmaken",
    "deadline": "2026-05-20",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-05-18T09:00:00.000Z"
  }
]
```

---

## POST /api/todos

Voegt een nieuwe taak toe.

**Request body**

```json
{
  "id": "uuid",
  "title": "string",
  "deadline": "YYYY-MM-DD",
  "priority": "high" | "medium" | "low",
  "completed": false,
  "createdAt": "ISO 8601"
}
```

> De client genereert `id` en `createdAt` via `crypto.randomUUID()` en `new Date().toISOString()`.

**Response `200`**

```json
{ "ok": true }
```

---

## PATCH /api/todos/:id

Werkt één of meer velden van een taak bij. Alle velden zijn optioneel — niet meegestuurde velden blijven ongewijzigd (`COALESCE`-patroon).

**Request body (gedeeltelijk)**

```json
{
  "title": "string",
  "deadline": "YYYY-MM-DD",
  "priority": "high" | "medium" | "low",
  "completed": true
}
```

**Response `200`**

```json
{ "ok": true }
```

---

## DELETE /api/todos/:id

Verwijdert een taak permanent.

**Response `200`**

```json
{ "ok": true }
```
