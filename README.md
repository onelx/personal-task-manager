# Personal Task Manager

A simple, offline-first personal task manager built with Next.js 14, Tailwind CSS, and Zustand.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Set priority levels (low, medium, high)
- ✅ Filter tasks by status and priority
- ✅ Search tasks by title
- ✅ Quick add tasks inline
- ✅ Offline-first with localStorage persistence
- ✅ Responsive design

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

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static export will be generated in the `out` directory.

## Deployment

This project is configured for static export and can be deployed to:

- **Vercel** (recommended): Just connect your repository
- **Netlify**: Deploy the `out` folder
- **GitHub Pages**: Deploy the `out` folder

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Storage**: localStorage
- **ID Generation**: nanoid

## License

MIT