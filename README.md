# Creatext AI — AI Content Generator

<p align="center">
  <a href="https://creatextai.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-CreatextAI-blue?style=for-the-badge&logo=vercel" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-Enabled-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-orange?style=for-the-badge&logo=google" />
  <img src="https://img.shields.io/badge/Auth-Clerk-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-Neon%20Postgres-00e599?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-02042b?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

## 📚 Table of Contents

- [Live Demo](#-live-demo)
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [High-Level Architecture Diagram](#high-level-architecture-diagram)
- [Project Structure](#-project-structure)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🌐 Live Demo

**[Visit CreatextAI →](https://creatextai.vercel.app/)**

## 📌 Overview

**Creatext AI** is a full-stack AI-powered content generation platform built with Next.js 15, Google Gemini, Clerk authentication, and Neon PostgreSQL. It allows users to generate high-quality marketing, social media, and developer content using pre-built AI templates.

## ✨ Features

* 🔐 Secure authentication with Clerk
* 🤖 AI content generation using Google Gemini
* 📝 23+ ready-to-use templates
* 💳 Credit-based usage system
* 📜 History of generated content
* 💰 Razorpay subscription billing
* 🎨 Modern UI with Tailwind CSS + shadcn/ui
* 🗄️ Serverless PostgreSQL with Neon

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Authentication | Clerk |
| AI Model | Google Gemini |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| Payments | Razorpay |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui + Radix |
| Deployment | Vercel |

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                     │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  Clerk   │  │  Dashboard   │  │  AI Content Editor     │ │
│  │  Auth UI │  │  (Templates) │  │  (Rich Text + Copy)    │ │
│  └────┬─────┘  └──────┬───────┘  └───────────┬────────────┘ │
└───────┼───────────────┼──────────────────────┼──────────────┘
        │               │                      │
        ▼               ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                   NEXT.JS APP ROUTER                        │
│  Middleware (auth gate via Clerk)                           |
│  ┌────────────────────────────────────────────────────────┐ │
│  │  PAGES / LAYOUTS                                       │ │
│  │  • / (Landing Page)                                    │ │
│  │  • /sign-in, /sign-up (Clerk)                          │ │
│  │  • /dashboard (Template Gallery)                       │ │
│  │  • /dashboard/content/:slug (AI Generation)            │ │
│  │  • /dashboard/history (Past Generations)               │ │
│  │  • /dashboard/billing (Subscription)                   │ │
│  │  • /dashboard/setting (User Settings)                  │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  API ROUTES                                            │ │
│  │  • POST /api/create-subscription (Razorpay)            │ │
│  │  • GET  /api/history (DB query - usage history)        │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  CONTEXT PROVIDERS                                     │ │
│  │  • TotalUsageContext                                   │ │
│  │  • UpdateCreditUsageContext                            │ │
│  │  • UserSubscriptionContext                             │ │
│  └────────────────────────────────────────────────────────┘ │
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

## 📁 Project Structure
```
ai-content-generator/
├── app/
│   ├── (auth)/              # Clerk auth pages
│   ├── (context)/           # Usage & subscription state
│   ├── (data)/              # AI templates
│   ├── api/                 # API routes
│   └── dashboard/           # Main app area
│
├── components/ui/           # shadcn components
├── lib/                     # Utility functions
├── utils/                   # DB, schema, AI config
├── public/                  # Static assets
├── middleware.ts            # Route protection
└── package.json

```
> For detailed end-to-end architecture, refer to [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for client-side | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key for server-side | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Custom sign-in URL path | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Custom sign-up URL path | ✅ |
| `NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `NEXT_PUBLIC_DRIZZLE_DB_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay publishable key | ✅ |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | ✅ |

---
## Local Setup

### Prerequisites
```
- Node.js 18.x or higher
- npm/yarn/pnpm
- PostgreSQL database (Neon account recommended)
- Clerk account
- Google AI Studio API key
- Razorpay account (for payments)
- Docker and Docker Compose (for Docker setup)
```

### Installation Steps

#### Option 1: Standard Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ai-content-generator.git
cd ai-content-generator
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Database (Neon PostgreSQL)
NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_database_url

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. **Set up the database**

```bash
# Generate Drizzle migrations
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Push schema directly
npm run db:push
```

5. **Run the development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

#### Option 2: Docker Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ai-content-generator.git
cd ai-content-generator
```

2. **Set up environment variables**

Create a `.env.local` file in the root directory with all required variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Database (Neon PostgreSQL)
NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_database_url

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

3. **Configure Next.js for standalone output**

Ensure your `next.config.js` includes:

```js
module.exports = {
  output: 'standalone',
  // ...other config
}
```

4. **Build and run with Docker Compose**

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

5. **Access the application**

Visit [http://localhost:3000](http://localhost:3000) to see the application.

**Useful Docker Commands:**

```bash
# Rebuild the image after code changes
docker-compose up -d --build

# View container status
docker-compose ps

# Execute commands inside the container
docker-compose exec app sh

# Remove containers and volumes
docker-compose down -v
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Google Gemini](https://ai.google.dev/) - AI model
- [Clerk](https://clerk.com/) - Authentication
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Razorpay](https://razorpay.com/) - Payment gateway

---
