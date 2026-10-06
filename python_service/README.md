# SolarWise AI — Python Machine Learning Microservice

## Overview
This service provides an empirical Machine Learning prediction engine for estimating **Annual Solar Energy Generation (`annual_generation_kwh`)** based on regional solar irradiance, system capacity, and rooftop shading conditions across India.

It fulfills the academic and faculty viva requirements by demonstrating an end-to-end data science and ML engineering pipeline:
1. **Data Preprocessing & Validation**: [`preprocessing.py`](preprocessing.py)
2. **Model Training & Evaluation**: [`train_model.py`](train_model.py)
3. **Inference Engine**: [`predict.py`](predict.py)
4. **REST Microservice**: [`app.py`](app.py) (Flask on port `5001`)

---

## Machine Learning Specification

- **Objective**: Predict continuous target `annual_generation_kwh`.
- **Algorithm**: `LinearRegression` (scikit-learn) — selected for transparent explainability, continuous numeric output, and deterministic behavior during technical evaluations.
- **Dataset**: `data/solar_generation_data.csv` (1,200 samples calibrated to Indian solar climatic baselines from NASA SSE / MNRE standards).
- **Features**:
  - `solar_radiation` (GHI in kWh/m²/day, range 3.0 to 7.5)
  - `system_size_kw` (Rooftop capacity in kW, range 0.5 to 15.0)
  - `shading_factor` (Obstruction coefficient: Low=1.0, Medium=0.90, High=0.78)
- **Train/Test Split**: 80% train (960 samples), 20% test (240 samples), with fixed `random_state=42`.

---

## Model Evaluation Metrics

Recorded in [`outputs/model_metrics.json`](outputs/model_metrics.json):
- **Mean Absolute Error (MAE)**: ~293.81 kWh/year
- **Root Mean Squared Error (RMSE)**: ~440.77 kWh/year
- **Coefficient of Determination ($R^2$)**: **0.9863** (98.6% variance explained)

---

## REST Endpoints (Port 5001)

### 1. Health Check
`GET http://127.0.0.1:5001/health`
```json
{
  "status": "ok",
  "service": "SolarWise Python ML Service",
  "model": "Linear Regression",
  "version": "1.0.0"
}
```

### 2. Predict Annual Generation
`POST http://127.0.0.1:5001/predict`
Request payload:
```json
{
  "radiation": 5.5,
  "system_size": 3.0,
  "shading_factor": 1.0
}
```
Response:
```json
{
  "status": "success",
  "predicted_generation": 4879,
  "model": "Linear Regression",
  "unit": "kWh/year"
}
```

---

## Running the Service

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Retrain Model (Optional)
```bash
python train_model.py
```

### 3. Start Flask API
```bash
python app.py
```
