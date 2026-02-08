# AI Content Generator — End-to-End Architecture

## Table of Contents

- [Overview](#overview)
- [High-Level Architecture Diagram](#high-level-architecture-diagram)
- [Tech Stack Summary](#tech-stack-summary)
- [Layer-by-Layer Breakdown](#layer-by-layer-breakdown)
  - [Authentication Layer — Clerk](#1-authentication-layer--clerk)
  - [Landing Page](#2-landing-page)
  - [Dashboard Layer](#3-dashboard-layer-authenticated-area)
  - [AI Content Generation — Core Feature](#4-ai-content-generation--core-feature)
  - [AI Model — Google Gemini](#5-ai-model--google-gemini)
  - [Database Layer — Neon PostgreSQL + Drizzle ORM](#6-database-layer--neon-postgresql--drizzle-orm)
  - [Usage & Credit System](#7-usage--credit-system)
  - [History Page](#8-history-page)
  - [Billing / Subscription — Razorpay](#9-billing--subscription--razorpay-integration)
  - [Settings Page](#10-settings-page)
  - [API Routes](#11-api-routes-summary)
  - [UI Component Library](#12-ui-component-library)
- [Data Flow Diagram](#data-flow-diagram)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)

---

## Overview

This is a **Next.js 15** full-stack application that generates AI-powered content using **Google Gemini 1.5 Flash**. It uses **Clerk** for authentication, **Neon PostgreSQL** (via **Drizzle ORM**) for persistence, **Razorpay** for payments, and **shadcn/ui + Tailwind CSS v4** for the UI layer. The app follows the **Next.js App Router** pattern with Server and Client Components.

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  Clerk   │  │  Dashboard   │  │  AI Content Editor     │ │
│  │  Auth UI │  │  (Templates) │  │  (Rich Text + Copy)    │ │
│  └────┬─────┘  └──────┬───────┘  └───────────┬────────────┘ │
└───────┼───────────────┼──────────────────────┼──────────────┘
        │               │                      │
        ▼               ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS APP ROUTER                         │
│                                                              │
│  Middleware (auth gate via Clerk)                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  PAGES / LAYOUTS                                       │  │
│  │  • / (Landing Page)                                    │  │
│  │  • /sign-in, /sign-up (Clerk)                         │  │
│  │  • /dashboard (Template Gallery)                       │  │
│  │  • /dashboard/content/:slug (AI Generation)           │  │
│  │  • /dashboard/history (Past Generations)               │  │
│  │  • /dashboard/billing (Subscription)                   │  │
│  │  • /dashboard/setting (User Settings)                  │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  API ROUTES                                            │  │
│  │  • POST /api/create-subscription (Razorpay)           │  │
│  │  • GET  /api/history (DB query - usage history)       │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  CONTEXT PROVIDERS                                     │  │
│  │  • TotalUsageContext                                   │  │
│  │  • UpdateCreditUsageContext                            │  │
│  │  • UserSubscriptionContext                             │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────┬──────────────┬──────────────────┬────────────────┘
           │              │                  │
           ▼              ▼                  ▼
   ┌──────────────┐ ┌───────────┐  ┌─────────────────┐
   │ Google       │ │ Neon      │  │ Razorpay        │
   │ Gemini API   │ │ Postgres  │  │ Payment Gateway │
   │ (AI Model)   │ │ (Drizzle) │  │                 │
   └──────────────┘ └───────────┘  └─────────────────┘
```

---

## Tech Stack Summary

| Layer              | Technology                         |
| ------------------ | ---------------------------------- |
| **Framework**      | Next.js 15 (App Router)            |
| **Language**       | TypeScript                         |
| **Auth**           | Clerk                              |
| **AI**             | Google Gemini 1.5 Flash            |
| **Database**       | Neon PostgreSQL                    |
| **ORM**            | Drizzle ORM                        |
| **Payments**       | Razorpay                           |
| **Styling**        | Tailwind CSS v4                    |
| **UI Components**  | shadcn/ui (Radix primitives)       |
| **Rich Text**      | Toast UI React Editor              |
| **Icons**          | Lucide React                       |
| **Deployment**     | Vercel (inferred from Next.js)     |

---

## Layer-by-Layer Breakdown

### 1. Authentication Layer — Clerk

#### Middleware (`middleware.ts`)

Uses `clerkMiddleware` to protect routes. Defines public routes (`/`, `/sign-in`, `/sign-up`) and redirects unauthenticated users away from `/dashboard`.

```typescript
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});
```

#### Auth Pages

- `app/(auth)/sign-in/` — Renders Clerk's `<SignIn />` component
- `app/(auth)/sign-up/` — Renders Clerk's `<SignUp />` component

#### Root Layout (`app/layout.tsx`)

Wraps the entire application in `<ClerkProvider>` and includes:
- Google Fonts (Outfit)
- Metadata & PWA manifest
- Global CSS

---

### 2. Landing Page

**File:** `app/page.tsx`

The public-facing home page containing:
- Hero section with CTA
- Features showcase
- Pricing tiers (Free & Monthly)
- Testimonials
- Footer
- Links to Clerk sign-in

---

### 3. Dashboard Layer (Authenticated Area)

#### Layout (`app/dashboard/layout.tsx`)

Wraps all dashboard pages with:
- **`<SiderNav />`** — Sidebar navigation
- **`<Header />`** — Top bar with search
- **Context Providers** — State management for credits and subscriptions

#### Context Providers

| Context                    | File                                        | Purpose                          |
| -------------------------- | ------------------------------------------- | -------------------------------- |
| `TotalUsageContext`        | `app/(context)/TotalUsageContext.tsx`        | Tracks total AI credits consumed |
| `UpdateCreditUsageContext` | `app/(context)/UpdateCreditUsageContext.tsx` | Triggers credit usage re-fetch   |
| `UserSubscriptionContext`  | `app/(context)/UserSubscriptionContext.tsx`  | Tracks active subscription state |

#### Dashboard Home (`app/dashboard/page.tsx`)

- Renders `<SearchSection />` and `<TemplateListSection />`
- Users search/filter through AI content templates

#### Template Data (`app/(data)/Templates.tsx`)

Static array of **23 template objects**, each containing:

| Property   | Description                                |
| ---------- | ------------------------------------------ |
| `name`     | Display name (e.g., "Blog Title")          |
| `desc`     | Description of the template                |
| `category` | Category for filtering                     |
| `icon`     | Icon path                                  |
| `aiPrompt` | Pre-configured prompt for Gemini           |
| `slug`     | URL-safe identifier                        |
| `form`     | Array of input field definitions           |

**Available Templates include:**
Blog Title, Blog Content, YouTube SEO Title, YouTube Description, YouTube Tags, Rewrite Article, Text Improver, Add Emoji, Instagram Post Generator, Instagram Hashtags, English Grammar Check, Write Code, Explain Code, Code Bug Detector, Tagline Generator, Product Description, and more.

#### Dashboard Components (`app/dashboard/_components/`)

| Component                | Role                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| `Header.tsx`             | Top navigation bar with search input and Clerk user button           |
| `SiderNav.tsx`           | Sidebar with nav links (Home, History, Billing, Setting) + UsageTrack |
| `SearchSection.tsx`      | Search bar to filter templates by name                               |
| `TemplateListSection.tsx`| Grid of template cards, filtered by search query                     |
| `TemplateCard.tsx`       | Individual clickable card linking to `/dashboard/content/{slug}`     |
| `UsageTrack.tsx`         | Credit usage progress bar (10,000 free / unlimited for subscribers)  |

---

### 4. AI Content Generation — Core Feature

**File:** `app/dashboard/content/[template-slug]/page.tsx`

This is the **heart of the application**. The flow:

1. **Looks up the template** from `Templates.tsx` by URL slug
2. **Renders a dynamic form** (`<FormSection />`) with fields defined in the template's `form` array
3. **On submit:** Constructs a prompt and calls Gemini via `chatSession.sendMessage()`
4. **Streams the AI response** into `<OutputSection />` (Toast UI rich text editor)
5. **Saves to database** via `SaveInDb()` → inserts into `AIOutput` table
6. **Updates credit usage** via context

```
User fills form → AI Prompt constructed → Gemini API → AI Response →
  → Displayed in Editor → Saved to DB → Credit usage updated
```

#### Sub-Components (`app/dashboard/content/_components/`)

| Component          | Role                                                           |
| ------------------ | -------------------------------------------------------------- |
| `FormSection.tsx`  | Dynamic form renderer based on template config (inputs/textareas) |
| `OutputSection.tsx`| Toast UI markdown editor for displaying, editing, and copying AI output |

---

### 5. AI Model — Google Gemini

**File:** `utils/AiModel.tsx`

```typescript
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});
```

| Parameter         | Value              |
| ----------------- | ------------------ |
| **Model**         | Gemini 1.5 Flash   |
| **Temperature**   | 1                  |
| **Top P**         | 0.95               |
| **Top K**         | 64                 |
| **Max Tokens**    | 8,192              |
| **History**       | Empty (stateless)  |

---

### 6. Database Layer — Neon PostgreSQL + Drizzle ORM

#### Configuration (`drizzle.config.js`)

```javascript
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};
```

#### Connection (`utils/db.tsx`)

```typescript
const pool = new Pool({ connectionString: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL });
export const db = drizzle({ client: pool });
```

Uses `drizzle-orm` with `pg` Pool driver connecting to **Neon PostgreSQL** (serverless).

#### Schema (`utils/schema.tsx`)

Single table — `aiOutput`:

```typescript
export const AIOutput = pgTable("aiOutput", {
  id:           serial("id").primaryKey(),
  formData:     varchar("formData").notNull(),
  aiResponse:   text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy:    varchar("createdBy").notNull(),   // Clerk user email
  createdAt:    varchar("createdAt"),
});
```

| Column         | Type      | Description                        |
| -------------- | --------- | ---------------------------------- |
| `id`           | `serial`  | Auto-increment primary key         |
| `formData`     | `varchar` | JSON stringified form input data   |
| `aiResponse`   | `text`    | Generated AI content               |
| `templateSlug` | `varchar` | Which template was used            |
| `createdBy`    | `varchar` | Clerk user email                   |
| `createdAt`    | `varchar` | Timestamp string                   |

---

### 7. Usage & Credit System

**File:** `utils/user-usage.tsx`

Two exported functions:

| Function           | Purpose                                                             |
| ------------------ | ------------------------------------------------------------------- |
| `fetchUserUsage()` | Queries all `AIOutput` rows for a user, sums character length of `aiResponse` |
| `fetchAllUsage()`  | Returns all `AIOutput` rows (used in history page)                  |

#### Credit Limits

| Plan           | Credit Limit              |
| -------------- | ------------------------- |
| **Free**       | 10,000 characters         |
| **Subscriber** | Unlimited                 |

Enforcement happens in the UI via `UsageTrack.tsx` component which reads from `TotalUsageContext` and `UserSubscriptionContext`.

---

### 8. History Page

**File:** `app/dashboard/history/page.tsx`

- Fetches all `AIOutput` records for the current authenticated user
- Displays in a table with columns:
  - Template name (with icon)
  - AI response (truncated preview)
  - Date of generation
  - Word count
  - Copy button
- Matches each record's `templateSlug` back to the template data for display metadata

---

### 9. Billing / Subscription — Razorpay Integration

#### Billing Page (`app/dashboard/billing/page.tsx`)

- Displays two pricing tiers: **Free** and **Monthly** ($5/month)
- On "Get Started" click:
  1. Calls `POST /api/create-subscription`
  2. Opens Razorpay checkout modal
  3. On payment success → saves subscription status to DB
  4. Updates `UserSubscriptionContext`

#### API Route (`app/api/create-subscription/route.tsx`)

- Creates a Razorpay subscription using `razorpay.subscriptions.create()`
- Returns subscription ID to the client for checkout

---

### 10. Settings Page

**File:** `app/dashboard/setting/page.tsx`

Embeds Clerk's `<UserProfile />` component for:
- Account management
- Profile editing
- Password changes
- Connected accounts

---

### 11. API Routes Summary

| Endpoint                  | Method | Purpose                        |
| ------------------------- | ------ | ------------------------------ |
| `/api/create-subscription`| `POST` | Creates Razorpay subscription  |
| `/api/history`            | `GET`  | Fetches AI output history from DB |

---

### 12. UI Component Library

Built with **shadcn/ui** configured via `components.json`:

```json
{
  "style": "new-york",
  "tailwind": { "cssVariables": true },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

| Component      | Path                              | Description           |
| -------------- | --------------------------------- | --------------------- |
| `Button`       | `components/ui/button.tsx`        | Variant-based button with CVA |
| `Input`        | `components/ui/input.tsx`         | Styled text input     |
| `AlertDialog`  | `components/ui/alert-dialog.tsx`  | Modal dialog          |
| `DropdownMenu` | `components/ui/dropdown-menu.tsx` | Dropdown menus        |

**Styling:** Tailwind CSS v4 with CSS custom properties for theming, defined in `app/globals.css`.

---

## Data Flow Diagram

```
┌──────────┐   Select Template    ┌──────────────┐
│  User    │─────────────────────▶│  Dashboard   │
│(Browser) │                      │  /dashboard  │
└──────────┘                      └──────┬───────┘
     │                                   │
     │  Fill form + Submit               │ Lookup template
     │                                   ▼
     │                            ┌──────────────┐
     │                            │ Templates.tsx │ (static config)
     │                            └──────┬───────┘
     ▼                                   │ aiPrompt
┌──────────────────┐                     ▼
│  Content Page    │──── Construct prompt + user input
│  [template-slug] │              │
└──────────────────┘              ▼
                          ┌──────────────┐
                          │ Google Gemini│
                          │ (1.5 Flash)  │
                          └──────┬───────┘
                                 │ AI Response (text)
                                 ▼
                     ┌─────────────────────┐
                     │ Display in Editor   │
                     │ (Toast UI Markdown) │
                     └─────────┬───────────┘
                               │ Save
                               ▼
                     ┌─────────────────────┐
                     │ Neon PostgreSQL     │
                     │ aiOutput table      │
                     │ (via Drizzle ORM)   │
                     └─────────────────────┘
                               │
                               ▼
                     ┌─────────────────────┐
                     │ Update Credit Usage │
                     │ (Context + UI)      │
                     └─────────────────────┘
```

---

## Environment Variables

| Variable                               | Service          | Scope   |
| -------------------------------------- | ---------------- | ------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`    | Clerk Auth       | Public  |
| `CLERK_SECRET_KEY`                     | Clerk Auth       | Server  |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`        | Clerk Routing    | Public  |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`        | Clerk Routing    | Public  |
| `NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY`    | Google AI        | Public  |
| `NEXT_PUBLIC_DRIZZLE_DB_URL`           | Neon PostgreSQL  | Public  |
| `RAZORPAY_KEY_SECRET`                  | Razorpay         | Server  |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`          | Razorpay         | Public  |

> ⚠️ **Note:** Some secrets (like DB URL and Gemini API key) are exposed via `NEXT_PUBLIC_` prefix. In production, these should be moved to server-only environment variables.

---

## Folder Structure

```
ai-content-generator/
├── app/
│   ├── globals.css                          # Tailwind CSS v4 + theme variables
│   ├── layout.tsx                           # Root layout (ClerkProvider, fonts)
│   ├── page.tsx                             # Landing page
│   ├── (auth)/
│   │   ├── sign-in/                         # Clerk Sign In
│   │   └── sign-up/                         # Clerk Sign Up
│   ├── (context)/
│   │   ├── TotalUsageContext.tsx             # Credit usage state
│   │   ├── UpdateCreditUsageContext.tsx      # Trigger credit refresh
│   │   └── UserSubscriptionContext.tsx       # Subscription state
│   ├── (data)/
│   │   └── Templates.tsx                    # 23 AI template definitions
│   ├── api/
│   │   ├── create-subscription/route.tsx    # Razorpay subscription API
│   │   └── history/route.tsx                # History query API
│   └── dashboard/
│       ├── layout.tsx                       # Dashboard layout (sidebar + header)
│       ├── page.tsx                         # Template gallery
│       ├── _components/
│       │   ├── Header.tsx                   # Top nav bar
│       │   ├── SiderNav.tsx                 # Side navigation
│       │   ├── SearchSection.tsx            # Template search
│       │   ├── TemplateListSection.tsx       # Template grid
│       │   ├── TemplateCard.tsx             # Individual template card
│       │   └── UsageTrack.tsx               # Credit usage tracker
│       ├── billing/page.tsx                 # Subscription management
│       ├── content/
│       │   └── [template-slug]/
│       │       ├── page.tsx                 # AI content generation page
│       │       └── _components/
│       │           ├── FormSection.tsx       # Dynamic form
│       │           └── OutputSection.tsx     # AI output editor
│       ├── history/page.tsx                 # Generation history
│       └── setting/page.tsx                 # User profile settings
├── components/
│   └── ui/
│       ├── alert-dialog.tsx                 # shadcn AlertDialog
│       ├── button.tsx                       # shadcn Button
│       ├── dropdown-menu.tsx                # shadcn DropdownMenu
│       └── input.tsx                        # shadcn Input
├── lib/
│   └── utils.ts                             # cn() utility (clsx + tailwind-merge)
├── utils/
│   ├── AiModel.tsx                          # Gemini AI configuration
│   ├── db.tsx                               # Drizzle DB connection
│   ├── schema.tsx                           # Database schema definition
│   └── user-usage.tsx                       # Usage calculation helpers
├── public/
│   └── site.webmanifest                     # PWA manifest
├── middleware.ts                             # Clerk auth middleware
├── drizzle.config.js                        # Drizzle ORM config
├── next.config.ts                           # Next.js configuration
├── tailwind / postcss.config.mjs            # CSS tooling
├── tsconfig.json                            # TypeScript config
├── components.json                          # shadcn/ui config
└── package.json                             # Dependencies
```

---

## Key Dependencies

```json
{
  "@clerk/nextjs":              "Authentication",
  "@google/generative-ai":      "Gemini AI SDK",
  "drizzle-orm":                "Database ORM",
  "pg":                         "PostgreSQL driver",
  "@toast-ui/react-editor":     "Rich text editor",
  "razorpay":                   "Payment gateway",
  "tailwindcss":                "CSS framework (v4)",
  "@radix-ui/*":                "Headless UI primitives",
  "lucide-react":               "Icon library",
  "class-variance-authority":   "Component variants",
  "clsx":                       "Conditional classes",
  "tailwind-merge":             "Tailwind class dedup",
  "moment":                     "Date formatting"
}
```

