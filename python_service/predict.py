"""
SolarWise AI — Prediction Module
Loads trained scikit-learn model and computes predicted annual solar generation.
"""

import os
import joblib
import pandas as pd
from preprocessing import prepare_inference_features, FEATURE_COLUMNS

class SolarPredictor:
    _instance = None
    _model = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, 'model', 'solar_generation_model.pkl')
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Trained model not found at {model_path}. Run train_model.py first.")
        self._model = joblib.load(model_path)

    def predict(self, radiation, system_size, shading_factor=1.0):
        """
        Predict annual solar generation in kWh/year.
        """
        features_df = prepare_inference_features(radiation, system_size, shading_factor)
        prediction = self._model.predict(features_df)[0]
        # Generation cannot be negative physically
        prediction_val = max(100.0, float(prediction))
        return round(prediction_val)

def predict_generation(radiation, system_size, shading_factor=1.0):
    predictor = SolarPredictor.get_instance()
    return predictor.predict(radiation, system_size, shading_factor)

if __name__ == '__main__':
    # Quick CLI test
    test_rad = 5.5
    test_size = 3.0
    test_shade = 1.0
    pred = predict_generation(test_rad, test_size, test_shade)
    print(f"Test Prediction for {test_size} kW @ {test_rad} GHI: {pred} kWh/year")
