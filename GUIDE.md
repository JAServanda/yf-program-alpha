# YF Program Alpha Guide

This guide explains how the app is organized, how to navigate the folders, and how the program works.

## What this program does

YF Program Alpha is a small loan-management dashboard. It lets approved Google users:

1. Sign in with a restricted email allowlist
2. View a dashboard summary of debtors and transactions
3. Browse debtor records
4. Review transaction history
5. Add, edit, and delete transactions from the browser

Right now, most data is stored in local mock files or browser storage. The app is set up so you can later connect a real database without changing the page structure.

## How to use the app

### 1. Sign in

- Open `/login`
- Sign in with Google
- Only emails listed in `lib/users.ts` are allowed
- Example admin email: `jaservanda@gmail.com`

After login, `/` redirects to `/dashboard`.

### 2. Main pages

| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/dashboard` | Summary cards, recent transactions, active debtors |
| Debtors | `/dashboard/debtors` | Borrower list with loan amount, interest, and date |
| Transaction History | `/dashboard/transactions/history` | Read-only list of all transactions |
| Manage Transactions | `/dashboard/transactions/manage` | Add, edit, and delete transactions |

### 3. Transactions workflow

Transactions are split into two sections:

- **History**: view all recorded payments and disbursements
- **Add / Edit / Delete**: manage transaction records

On the manage page:

1. Fill in debtor, type, amount, and date
2. Click **Add transaction**
3. Use **Edit** to load a record into the form
4. Use **Delete** to remove a record

Transaction changes are saved in the browser using `localStorage`, so they persist on refresh but only on the current device/browser.

## Folder structure

```text
yf-program-alpha/
├── app/                          # Next.js App Router pages and layouts
│   ├── api/auth/[...nextauth]/   # NextAuth Google login API route
│   ├── dashboard/                # Protected dashboard area
│   │   ├── layout.tsx            # Sidebar shell, header, auth check
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── debtors/page.tsx      # Debtors page
│   │   └── transactions/         # Transactions section
│   │       ├── layout.tsx        # Shared transactions provider + tabs
│   │       ├── page.tsx          # Redirects to history
│   │       ├── history/page.tsx  # Read-only transaction history
│   │       └── manage/page.tsx   # Add, edit, delete transactions
│   ├── login/page.tsx            # Google sign-in page
│   ├── unauthorized/page.tsx     # Shown when email is not allowed
│   ├── layout.tsx                # Root app layout
│   ├── page.tsx                  # Redirects logged-in users to dashboard
│   └── globals.css               # Theme, glassmorphism utilities
│
├── components/                   # Reusable UI and feature components
│   ├── app-sidebar.tsx           # Main sidebar navigation
│   ├── dashboard-ui.tsx          # Page header, stat cards, responsive tables
│   ├── transaction-history-panel.tsx
│   ├── transaction-manage-panel.tsx
│   ├── transactions-provider.tsx # Shared transaction state + localStorage
│   ├── transactions-subnav.tsx   # History / Manage tabs
│   ├── google-sign-in-button.tsx
│   └── ui/                       # shadcn/Base UI building blocks
│
├── lib/                          # App logic and helpers
│   ├── auth.ts                   # NextAuth Google config
│   ├── auth-helpers.ts           # Server session helpers
│   ├── users.ts                  # Allowed emails and roles
│   └── mock-data.ts              # Sample debtors, transactions, stats
│
├── types/
│   └── next-auth.d.ts            # Session typing for role support
│
├── proxy.ts                      # Route protection for signed-in users
├── .env.example                  # Required environment variables
└── GUIDE.md                      # This file
```

## How authentication works

1. User clicks **Sign in with Google**
2. NextAuth handles the OAuth flow in `app/api/auth/[...nextauth]/route.ts`
3. `lib/auth.ts` checks whether the email exists in `lib/users.ts`
4. If allowed, a session is created with email and role
5. `proxy.ts` blocks unauthenticated access to protected routes
6. Dashboard layouts also call `requireSession()` on the server

## How roles work

Roles are assigned by email in `lib/users.ts`:

```ts
export const USER_ROLES = {
  "jaservanda@gmail.com": "admin",
};
```

You can add more emails and roles there. Use `requireRole("admin")` in server pages when you need admin-only access.

## UI design notes

The dashboard uses a **mobile-first glassmorphism** style:

- Gradient app background via `.app-gradient`
- Frosted panels via `.glass-panel`
- Tables become stacked cards on small screens
- Sidebar collapses into a mobile sheet on small devices

Main styling lives in:

- `app/globals.css`
- `components/dashboard-ui.tsx`
- `app/dashboard/layout.tsx`

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

For production, set the same values in your hosting provider and use your production URL for `NEXTAUTH_URL`.

## Common next steps

- Move debtors and transactions from `lib/mock-data.ts` into a database
- Replace `localStorage` transaction storage with server actions or an API
- Add admin-only routes using `requireRole("admin")`
- Add create/edit/delete for debtors, similar to transactions

## Quick dev commands

```bash
npm run dev     # Start local development server
npm run build   # Production build check
npm run start   # Run production build locally
```
