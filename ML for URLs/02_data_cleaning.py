#!/usr/bin/env python3

"""
02_data_cleaning.py

Prepares the phishing dataset for training, including feature selection and cleaning.
"""

import pandas as pd

def main():
    csv_file_path = "Phishing_Legitimate_full.csv"
    
    # Load the dataset
    print("Loading dataset...")
    df = pd.read_csv(csv_file_path)
    
    # Remove the 'id' column to avoid data leakage
    print("Removing 'id' column...")
    if 'id' in df.columns:
        df = df.drop(columns=['id'])
    
    # Drop low-impact and placeholder features
    print("Dropping low-impact and placeholder features...")
    features_to_drop = [
        'RandomString',          # Placeholder with no real implementation
        'DomainInSubdomains',    # Placeholder
        'DomainInPaths',         # Placeholder
        'DoubleSlashInPath',     # Low importance
        'HttpsInHostname',       # Low importance
        'TildeSymbol',           # Low importance
        'NumHash',               # Low importance
        'PopUpWindow',           # Placeholder with low importance
        'ImagesOnlyInForm'       # Placeholder
    ]
    df = df.drop(columns=[col for col in features_to_drop if col in df.columns])

    # Check for missing values
    print("\n=== Missing values in each column ===")
    print(df.isnull().sum())

    # Descriptive statistics for validation
    print("\n=== Descriptive statistics ===")
    print(df.describe())

    # Save the cleaned dataset
    cleaned_file_path = "Phishing_Legitimate_cleaned.csv"
    df.to_csv(cleaned_file_path, index=False)
    print(f"\nCleaned dataset saved as {cleaned_file_path}")


if __name__ == "__main__":
    main()
