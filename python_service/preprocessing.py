"""
SolarWise AI — Preprocessing Module
Handles data loading, cleaning, validation, and feature preparation for ML pipeline.
"""

import os
import pandas as pd
import numpy as np

FEATURE_COLUMNS = ['solar_radiation', 'system_size_kw', 'shading_factor']
TARGET_COLUMN = 'annual_generation_kwh'

def load_data(filepath=None):
    """
    Load solar generation dataset from CSV.
    """
    if filepath is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        filepath = os.path.join(base_dir, 'data', 'solar_generation_data.csv')
        
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Solar dataset not found at: {filepath}")
        
    df = pd.read_csv(filepath)
    return df

def clean_and_prepare_features(df):
    """
    Validates, handles missing values, and extracts X and y.
    """
    # Remove nulls if any
    clean_df = df.dropna(subset=FEATURE_COLUMNS + [TARGET_COLUMN]).copy()
    
    # Filter physical sanity bounds
    clean_df = clean_df[
        (clean_df['solar_radiation'] >= 3.0) & (clean_df['solar_radiation'] <= 8.0) &
        (clean_df['system_size_kw'] >= 0.5) & (clean_df['system_size_kw'] <= 25.0) &
        (clean_df['shading_factor'] >= 0.5) & (clean_df['shading_factor'] <= 1.0) &
        (clean_df[TARGET_COLUMN] > 0)
    ]
    
    X = clean_df[FEATURE_COLUMNS].copy()
    y = clean_df[TARGET_COLUMN].copy()
    
    return X, y, clean_df

def prepare_inference_features(radiation, system_size, shading_factor):
    """
    Format single record for inference.
    """
    rad = float(radiation)
    size = float(system_size)
    shade = float(shading_factor)
    
    # Sanity bounding
    rad = max(2.5, min(7.5, rad))
    size = max(0.5, min(20.0, size))
    shade = max(0.5, min(1.0, shade))
    
    return pd.DataFrame([[rad, size, shade]], columns=FEATURE_COLUMNS)
