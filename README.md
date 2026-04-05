# FinTrack — Financial Dashboard

A modern, responsive financial dashboard built with React to track income, expenses, and spending patterns with interactive charts, role-based access, and a dark/light theme.

## Features

- **Dashboard Overview** — Summary cards (balance, income, expenses, transaction count) with trend indicators, area chart for balance over time, and donut chart for spending by category
- **Transactions Management** — Searchable, filterable, sortable table with full CRUD (add, edit, delete) via modal forms and CSV export
- **Financial Insights** — Computed metrics (top spending category, savings rate, income/expense ratio, average transaction), monthly comparison bar chart, and a radial savings gauge
- **Role-Based UI** — Switch between Admin (full CRUD) and Viewer (read-only) modes via the sidebar
- **Dark / Light Theme** — Toggle between themes; preference persists across sessions
- **Responsive Design** — Collapsible sidebar on mobile, adaptive grid layouts for all screen sizes
- **Persistent State** — Transactions, theme, and role are saved to localStorage via Zustand

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| State Management | Zustand 5 (with `persist` middleware) |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Styling | Vanilla CSS with CSS custom properties |

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/fudailzafar/fintrack-dashboard
cd fintrack-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173/**.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project Structure

```
src/
├── App.jsx                  # Root layout — sidebar + page routing + theme sync
├── App.css                  # All component styles
├── index.css                # Design tokens, theme variables, global reset
├── main.jsx                 # React entry point
├── components/
│   ├── Sidebar.jsx          # Navigation, role switcher, theme toggle
│   └── TransactionModal.jsx # Add / edit transaction form
├── pages/
│   ├── DashboardPage.jsx    # Summary cards, charts, recent transactions
│   ├── TransactionsPage.jsx # Filterable table with CRUD actions
│   └── InsightsPage.jsx     # Computed metrics and comparison charts
├── store/
│   └── useStore.js          # Zustand store (transactions, filters, theme, role)
└── data/
    └── mockData.js          # Sample transactions, categories, helper functions
```

## Usage

1. **Navigate** between Dashboard, Transactions, and Insights using the sidebar
2. **Switch roles** using the Admin / Viewer toggle in the sidebar footer
3. **Add a transaction** — click the "Add Transaction" button (Admin only) on the Transactions page
4. **Edit / Delete** — use the action icons on each table row (Admin only)
5. **Filter & Sort** — use the search bar, category/type dropdowns, and clickable column headers
6. **Export** — click "Export CSV" to download all filtered transactions
7. **Toggle theme** — click the theme button at the bottom of the sidebar

## License

MIT
