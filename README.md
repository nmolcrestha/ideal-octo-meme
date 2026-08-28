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

## Authentication

`/dashboard` requires a signed-in user, so set this up before the first run:

```bash
cp .env.example .env        # then fill in DATABASE_URL and SESSION_SECRET
npm run db:migrate          # create the users table
npm run db:seed             # create the account you sign in with
```

`npm run db:seed` prints the credentials it created. By default they are
`anmol@mandarix.com` / `sightline123`; override them with `SEED_USER_EMAIL` and
`SEED_USER_PASSWORD` in `.env`. The seed is idempotent, so re-running it resets
that account's password rather than failing.

How it fits together:

| File                    | Role                                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `proxy.ts`              | Redirects anonymous requests away from `/dashboard` by reading the session cookie. Optimistic only — never the guard. |
| `lib/auth/session.ts`   | Signs and verifies the session JWT.                                                                                   |
| `lib/auth/dal.ts`       | The real guard. Resolves the cookie against the database; `requireUser()` fails closed.                               |
| `app/actions/auth.ts`   | The `login` and `logout` Server Actions.                                                                              |
| `lib/dashboard/data.ts` | Every fetcher calls `verifySession()`, so no page can read dashboard data unauthenticated.                            |

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
