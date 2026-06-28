from flask import Blueprint, jsonify
from data.mock_data import METRICS, PORTFOLIO_PERFORMANCE, ALLOCATION, ALERTS

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/metrics", methods=["GET"])
def get_metrics():
    return jsonify(METRICS)

@dashboard_bp.route("/portfolio-performance", methods=["GET"])
def get_portfolio_performance():
    return jsonify(PORTFOLIO_PERFORMANCE)

@dashboard_bp.route("/allocation", methods=["GET"])
def get_allocation():
    return jsonify(ALLOCATION)

@dashboard_bp.route("/alerts", methods=["GET"])
def get_alerts():
    return jsonify(ALERTS)
