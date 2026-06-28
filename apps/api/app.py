from flask import Flask, jsonify
from flask_cors import CORS
from routes.dashboard import dashboard_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
