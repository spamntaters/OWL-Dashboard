import random
from datetime import datetime, timedelta

def generate_portfolio_performance():
    """Generate 12 months of cumulative percentage returns data."""
    data = []
    
    # Generate monthly dates from Jan 2024 to Dec 2024
    start_date = datetime(2024, 1, 1)
    
    cumulative_actual = 0.0
    cumulative_projected = 0.0
    
    for i in range(12):
        date = start_date + timedelta(days=30*i)
        date_str = date.strftime("%Y-%m-%d")
        
        # Benchmark: smooth 8% annual = ~0.643% monthly compounded
        monthly_benchmark_return = 0.643
        cumulative_projected = (1 + cumulative_projected / 100) * (1 + monthly_benchmark_return / 100) * 100 - 100
        
        # Actual: tracks benchmark closely with smaller variance
        # Slight positive bias to show outperformance
        monthly_actual_return = monthly_benchmark_return + random.uniform(-1.0, 1.5)
        cumulative_actual = (1 + cumulative_actual / 100) * (1 + monthly_actual_return / 100) * 100 - 100
        
        data.append({
            "date": date_str,
            "actual": round(cumulative_actual, 2),
            "projected": round(cumulative_projected, 2)
        })
    
    return data

METRICS = [
    {
        "type": "status",
        "label": "Funds Monitored",
        "value": 142,
        "change": 8.2
    },
    {
        "type": "funds",
        "label": "Total AUM Tracked",
        "value": 15_000_000_000,
        "change": 12.5
    },
    {
        "type": "success",
        "label": "Avg. YTD Return",
        "value": 12.5,
        "change": 3.1
    },
    {
        "type": "warning",
        "label": "Active Alerts",
        "value": 24,
        "change": -15.0
    }
]

ALLOCATION = [
    {"type": "hedge_funds", "percent": 32},
    {"type": "private_equity", "percent": 25},
    {"type": "venture_capital", "percent": 18},
    {"type": "real_assets", "percent": 12},
    {"type": "fixed_income", "percent": 8},
    {"type": "public_equity", "percent": 5}
]

ALERTS = [
    {
        "id": "1",
        "type": "success",
        "title": "Tiger Global +25% YTD",
        "message": "Outperforming benchmark by 17.3pp",
        "timestamp": "2026-06-28T09:30:00Z",
        "read": False
    },
    {
        "id": "2",
        "type": "warning",
        "title": "Bridgewater drawdown alert",
        "message": "Pure Alpha fund down 3.1% YTD",
        "timestamp": "2026-06-28T09:15:00Z",
        "read": False
    },
    {
        "id": "3",
        "type": "personnel",
        "title": "PM departure at Citadel",
        "message": "Senior PM Alex Chen leaving",
        "timestamp": "2026-06-28T08:45:00Z",
        "read": False
    },
    {
        "id": "4",
        "type": "status",
        "title": "Baupost ADV amendment",
        "message": "Updated Form ADV filed with SEC",
        "timestamp": "2026-06-28T08:00:00Z",
        "read": False
    },
    {
        "id": "5",
        "type": "success",
        "title": "Renaissance +32.1%",
        "message": "Top performer in universe",
        "timestamp": "2026-06-27T16:00:00Z",
        "read": True
    }
]

PORTFOLIO_PERFORMANCE = generate_portfolio_performance()
