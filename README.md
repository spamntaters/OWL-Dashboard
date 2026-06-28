# OWL Dashboard

An investment fund monitoring dashboard built with a modern React frontend and Flask backend. Designed to track fund performance, portfolio allocation, and real-time alerts in a clean, responsive interface.

---

## Architecture

This is a monorepo with two applications:

- **`apps/web`** — React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Recharts
- **`apps/api`** — Python 3.12+ + Flask (mock data API)

No database layer at this stage. The backend serves static mock data through a REST API.

---

## Project Structure

```
OWL-Dashboard/
├── apps/
│   ├── api/                    # Flask backend
│   │   ├── app.py              # Flask app entry point
│   │   ├── routes/
│   │   │   └── dashboard.py    # API route definitions
│   │   ├── data/
│   │   │   └── mock_data.py    # Mock data generators
│   │   └── requirements.txt
│   │
│   └── web/                    # React frontend
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   │   ├── KpiCard.tsx
│       │   │   ├── KpiCards.tsx
│       │   │   ├── PerformanceChart.tsx
│       │   │   ├── AllocationChart.tsx
│       │   │   ├── AlertItem.tsx
│       │   │   ├── AlertsSidebar.tsx
│       │   │   └── Navbar.tsx
│       │   ├── pages/
│       │   │   └── Dashboard.tsx   # Smart component — fetches all data
│       │   ├── lib/
│       │   │   ├── api.ts          # API client + types
│       │   │   ├── utils.ts      # Tailwind merge utility
│       │   │   └── dashboard-helpers.tsx  # Type-to-icon/color mapping
│       │   └── App.tsx
│       ├── package.json
│       └── vite.config.ts
│
├── package.json                # Root orchestration scripts
├── requirements.txt
└── README.md
```

---

## Dashboard Layout

```
┌──────────────────────────────┬─────────────┐
│          KPI Cards           │             │
├──────────────────────────────┤   Alerts    │
│  Cumulative    │  Strategy   │  Sidebar    │
│  Returns Chart │  Allocation │             │
└──────────────────────────────┴─────────────┘
```

- **Navbar** — Logo, nav links, user avatar
- **KPI Cards** — Funds Monitored, Total AUM, Avg. YTD Return, Active Alerts
- **Performance Chart** — Cumulative returns % (actual vs benchmark)
- **Allocation Chart** — Donut chart showing strategy allocation
- **Alerts Sidebar** — Scrollable list of fund alerts with type badges

---

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** — Build tool & dev server
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Headless UI primitives (Card, Badge)
- **Recharts** — Chart visualizations (line + donut)
- **Lucide React** — Icons

### Backend
- **Flask** — Python web framework
- **Flask-CORS** — Cross-origin support for local development

---

## Prerequisites

- **Node.js** 18+ (with npm)
- **Python** 3.12+

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <repo-url>
cd OWL-Dashboard

# Install frontend dependencies
cd apps/web && npm install && cd ../..

# Install Python dependencies in a virtual environment
python3 -m venv venv
venv/bin/pip install -r apps/api/requirements.txt
```

### 2. Run Both Apps (Recommended)

From the project root:

```bash
npm run dev
```

This starts both the Flask backend (port 5001) and Vite frontend (port 5173) concurrently.

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

### 3. Run Apps Individually

**Backend only:**
```bash
cd apps/api && ../../venv/bin/python app.py
```

**Frontend only:**
```bash
cd apps/web && npm run dev
```

---

## Available API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/dashboard/metrics` | KPI card data |
| `GET /api/dashboard/portfolio-performance` | Cumulative returns % over time |
| `GET /api/dashboard/allocation` | Strategy allocation percentages |
| `GET /api/dashboard/alerts` | Fund alerts list |

---

## Development Scripts

From the project root (`package.json`):

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both backend and frontend |
| `npm run dev:api` | Start Flask backend only |
| `npm run dev:web` | Start Vite frontend only |
| `npm run build` | Build frontend for production |
| `npm run install:all` | Install frontend dependencies |

---

## Component Architecture

The frontend follows a **smart/dumb component** pattern:

- **`Dashboard.tsx`** — The only "smart" component. Fetches all API data via `Promise.all`, manages loading state, and passes data as props to children.
- **All other components** — "Dumb" presentational components. They receive data via props and have no side effects or API calls.

This makes components reusable, testable, and easy to reason about.

---

## Customization

### Changing Mock Data

Edit `apps/api/data/mock_data.py` to adjust:
- KPI values and labels
- Portfolio performance trajectory
- Strategy allocation percentages
- Alert titles, messages, and timestamps

### Adding New Metrics

1. Add the new metric object to `METRICS` in `mock_data.py`
2. Add a `typeToIcon` and `typeToColor` mapping in `apps/web/src/lib/dashboard-helpers.tsx`
3. Add formatting logic in `formatMetricValue()` if needed

### Adding New Alert Types

1. Add the alert to `ALERTS` in `mock_data.py`
2. Add `typeToIcon`, `typeToColor`, and `typeToBadgeColor` mappings in `dashboard-helpers.tsx`

---

## Notes

- The Flask backend runs with `debug=True` for auto-reload during development
- The Vite dev server proxies `/api` requests to the Flask backend automatically
- No database is used — all data is generated in-memory on server start

## What's next?
- Adding a DB layer is the obvious next step but to build a good usable schema would mean more requirements-gathering to understand how this simple dashboard fits into the broader application.
- With more time, I would add a PATCH endpoint to mark an alert as read.
- If data used in this dashboard was to be needed on other unrelated pages, the Context API would need to be brought in for state management.
- As we shift from mock data to persistent data from a DB, then we could consider bringing in tanstack query to help avoid common problems such as graceful error handling, pagination, query caching and cache invalidation.

---

## License

MIT
