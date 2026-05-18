# Mijn Taken

Een eenvoudige todo-app gebouwd met Next.js en een Neon Postgres-database.

## Functies

- Taken aanmaken met titel, deadline en prioriteit (hoog / midden / laag)
- Taken bewerken en verwijderen
- Taken als voltooid markeren
- Filteren op status: alles / actief / voltooid
- Sorteren op deadline, prioriteit of aanmaakdatum
- Header toont live tellingen: actief · voltooid · **vandaag aangemaakt**

## Tech stack

- **Next.js** (App Router) met TypeScript
- **Neon** serverless Postgres via `@neondatabase/serverless`
- **Tailwind CSS** voor styling

## Database

De app verwacht een `todos`-tabel:

```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  deadline TEXT NOT NULL,
  priority TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TEXT NOT NULL
);
```

Stel `DATABASE_URL` in als omgevingsvariabele (bijv. in `.env.local`).

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
