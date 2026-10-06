"""
SolarWise AI — Python ML Microservice (Flask)
Exposes REST endpoints for health check, model metrics, and annual solar generation predictions.
Runs on port 5001.
"""

import os
import json
from flask import Flask, request, jsonify
from predict import predict_generation, SolarPredictor

app = Flask(__name__)

# Preload model on startup
try:
    SolarPredictor.get_instance()
    MODEL_STATUS = "loaded"
except Exception as e:
    MODEL_STATUS = f"error: {str(e)}"

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint required by architecture."""
    return jsonify({
        "status": "ok",
        "service": "SolarWise Python ML Service",
        "model": "Linear Regression",
        "model_status": MODEL_STATUS,
        "version": "1.0.0"
    }), 200

@app.route('/metrics', methods=['GET'])
def metrics():
    """Return trained model evaluation metrics."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    metrics_path = os.path.join(base_dir, 'outputs', 'model_metrics.json')
    if os.path.exists(metrics_path):
        with open(metrics_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data), 200
    return jsonify({"error": "Metrics file not found. Run train_model.py first."}), 404

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict annual solar energy generation.
    Expected JSON:
    {
      "radiation": 5.5,
      "system_size": 3.0,
      "shading_factor": 1.0
    }
    """
    try:
        data = request.get_json(force=True, silent=True)
        if not data:
            return jsonify({"error": "INVALID_JSON", "message": "Expected JSON payload"}), 400

        # Extract features with flexible key names for developer convenience
        radiation = data.get('radiation') or data.get('solar_radiation')
        system_size = data.get('system_size') or data.get('system_size_kw') or data.get('systemSize')
        shading_factor = data.get('shading_factor') or data.get('shadingFactor') or 1.0

        if radiation is None or system_size is None:
            return jsonify({
                "error": "MISSING_PARAMETERS",
                "message": "Both 'radiation' and 'system_size' are required numeric features."
            }), 400

        rad_val = float(radiation)
        size_val = float(system_size)
        shade_val = float(shading_factor)

        # Compute prediction using trained scikit-learn Linear Regression model
        prediction_kwh = predict_generation(rad_val, size_val, shade_val)

        return jsonify({
            "status": "success",
            "predicted_generation": prediction_kwh,
            "model": "Linear Regression",
            "unit": "kWh/year",
            "input": {
                "radiation": rad_val,
                "system_size": size_val,
                "shading_factor": shade_val
            }
        }), 200

    except ValueError as ve:
        return jsonify({"error": "INVALID_INPUT", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "PREDICTION_FAILED", "message": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PYTHON_PORT', 5001))
    print(f"[SolarWise Python ML] Service starting on http://127.0.0.1:{port}")
    app.run(host='127.0.0.1', port=port, debug=False)
