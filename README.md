# Personal Task Manager

A simple, offline-first task manager built with Next.js 14, Tailwind CSS, and Zustand.

## Features

- ✅ Create, edit, and delete tasks
- 🎯 Set priority levels (low, medium, high)
- 🔍 Search tasks by title
- 📋 Filter by status (all, pending, completed)
- 💾 Automatic localStorage persistence
- 📱 Responsive design
- ⚡ Fast and lightweight

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd personal-task-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static files will be generated in the `out` directory.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

## Tech Stack

- **Framework**: Next.js 14 (Static Export)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Storage**: localStorage
- **Language**: TypeScript

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── TaskList.tsx    # Task list container
│   ├── TaskCard.tsx    # Individual task card
│   ├── TaskForm.tsx    # Create/edit form modal
│   ├── FilterBar.tsx   # Status/priority filters
│   ├── SearchInput.tsx # Search input
│   ├── QuickAddTask.tsx# Quick add inline input
│   └── EmptyState.tsx  # Empty state display
├── hooks/
│   ├── useTaskStore.ts # Zustand store
│   ├── useLocalStorage.ts # localStorage hook
│   └── useTaskFilters.ts  # Filter logic hook
├── lib/
│   ├── storage.ts      # localStorage wrapper
│   └── taskUtils.ts    # Task utilities
└── types/
    └── index.ts        # TypeScript types
```

## License

MIT