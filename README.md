# Krunal Valvi — Portfolio + Admin Dashboard

Full-stack personal portfolio with admin panel. Built with Next.js 14, TypeScript, Node.js/Express, MongoDB.

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`)

### 1. Setup

```bash
cd portfolio
```

### 2. Start Server

```bash
cd server
npm install
npm run dev
```

### 3. Start Client (new terminal)

```bash
cd client
npm install
npm run dev
```

Visit: http://localhost:3000  
Admin: http://localhost:3000/admin  
Default credentials: `admin@krunal.dev` / `admin123`

## Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT

## Folder Structure
```
portfolio/
├── client/          # Next.js frontend
│   └── src/
│       ├── app/     # App Router pages
│       ├── components/
│       └── lib/     # API helpers
├── server/          # Express backend
│   └── src/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       └── seed.ts  # Auto-seeds admin + sample data
├── .env             # Environment variables
└── README.md
```
