"""
SolarWise AI — Machine Learning Model Training Pipeline
Trains a Linear Regression model on solar features to predict annual generation (kWh/year).
Evaluates MAE, RMSE, and R2 on holdout test set (random_state=42).
Saves the trained model, evaluation metrics JSON, and diagnostic plots.
"""

import os
import json
import joblib
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from preprocessing import load_data, clean_and_prepare_features, FEATURE_COLUMNS, TARGET_COLUMN

def train_and_evaluate():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_dir = os.path.join(base_dir, 'model')
    output_dir = os.path.join(base_dir, 'outputs')
    charts_dir = os.path.join(output_dir, 'charts')
    
    os.makedirs(model_dir, exist_ok=True)
    os.makedirs(charts_dir, exist_ok=True)
    
    print("=" * 60)
    print("SOLARWISE AI — PYTHON ML TRAINING PIPELINE")
    print("=" * 60)
    
    # 1. Load & Preprocess
    print("\n[1/5] Loading and preparing dataset...")
    df = load_data()
    X, y, clean_df = clean_and_prepare_features(df)
    print(f"Loaded {len(X)} valid samples with features: {FEATURE_COLUMNS}")
    
    # 2. Train / Test Split
    print("\n[2/5] Performing Train/Test Split (80/20, random_state=42)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )
    print(f"Training samples: {len(X_train)} | Test samples: {len(X_test)}")
    
    # 3. Train Model (Linear Regression)
    print("\n[3/5] Fitting Linear Regression model...")
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    print("Coefficients:")
    for feature, coef in zip(FEATURE_COLUMNS, model.coef_):
        print(f"  - {feature}: {coef:.4f}")
    print(f"  - Intercept: {model.intercept_:.4f}")
    
    # 4. Evaluation on Holdout Test Set
    print("\n[4/5] Evaluating model on holdout test set...")
    y_pred = model.predict(X_test)
    
    mae = float(mean_absolute_error(y_test, y_pred))
    rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
    r2 = float(r2_score(y_test, y_pred))
    
    print(f"  MAE  : {mae:.2f} kWh/year")
    print(f"  RMSE : {rmse:.2f} kWh/year")
    print(f"  R²   : {r2:.4f}")
    
    # 5. Save Artifacts
    print("\n[5/5] Saving model, metrics, and visualization charts...")
    model_path = os.path.join(model_dir, 'solar_generation_model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved to: {model_path}")
    
    metrics = {
        "model": "Linear Regression",
        "target": TARGET_COLUMN,
        "features": FEATURE_COLUMNS,
        "train_samples": int(len(X_train)),
        "test_samples": int(len(X_test)),
        "mae": round(mae, 2),
        "rmse": round(rmse, 2),
        "r2": round(r2, 4),
        "coefficients": {k: round(float(v), 4) for k, v in zip(FEATURE_COLUMNS, model.coef_)},
        "intercept": round(float(model.intercept_), 4),
        "dataset_type": "demonstration_benchmark",
        "documentation": "Calibrated physics-grounded benchmark solar generation dataset for rooftop PV across 24 Indian climatic regions (NASA SSE & MNRE irradiance standards)."
    }
    
    metrics_path = os.path.join(output_dir, 'model_metrics.json')
    with open(metrics_path, 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2)
    print(f"Metrics saved to: {metrics_path}")
    
    # Generate Charts
    # Chart 1: Actual vs Predicted
    plt.figure(figsize=(8, 6), facecolor='#0b0f17')
    ax = plt.axes()
    ax.set_facecolor('#0f172a')
    plt.scatter(y_test, y_pred, color='#e5ff3f', alpha=0.6, edgecolors='none', s=35, label='Predictions')
    min_val = min(y_test.min(), y_pred.min())
    max_val = max(y_test.max(), y_pred.max())
    plt.plot([min_val, max_val], [min_val, max_val], color='#38bdf8', linestyle='--', linewidth=2, label='Perfect Fit')
    plt.title('SolarWise ML: Actual vs Predicted Solar Generation', color='#f8fafc', fontsize=13, pad=12, fontweight='bold')
    plt.xlabel('Actual Generation (kWh/year)', color='#94a3b8', fontsize=11)
    plt.ylabel('Predicted Generation (kWh/year)', color='#94a3b8', fontsize=11)
    ax.tick_params(colors='#94a3b8')
    plt.grid(True, color='#ffffff', alpha=0.08, linestyle='-')
    plt.legend(facecolor='#1e293b', edgecolor='none', labelcolor='#f8fafc')
    plt.tight_layout()
    chart1_path = os.path.join(charts_dir, 'actual_vs_predicted.png')
    plt.savefig(chart1_path, dpi=200, facecolor='#0b0f17')
    plt.close()
    
    # Chart 2: Residuals Distribution
    residuals = y_test - y_pred
    plt.figure(figsize=(8, 5), facecolor='#0b0f17')
    ax = plt.axes()
    ax.set_facecolor('#0f172a')
    plt.hist(residuals, bins=30, color='#22c55e', alpha=0.8, edgecolor='#0f172a')
    plt.axvline(0, color='#e5ff3f', linestyle='--', linewidth=1.5)
    plt.title('Residual Error Distribution (y_test - y_pred)', color='#f8fafc', fontsize=13, pad=12, fontweight='bold')
    plt.xlabel('Error (kWh/year)', color='#94a3b8', fontsize=11)
    plt.ylabel('Frequency', color='#94a3b8', fontsize=11)
    ax.tick_params(colors='#94a3b8')
    plt.grid(True, color='#ffffff', alpha=0.08)
    plt.tight_layout()
    chart2_path = os.path.join(charts_dir, 'residuals.png')
    plt.savefig(chart2_path, dpi=200, facecolor='#0b0f17')
    plt.close()
    
    print(f"Evaluation charts saved to: {charts_dir}")
    print("\nTraining completed successfully!")
    return metrics

if __name__ == '__main__':
    train_and_evaluate()
