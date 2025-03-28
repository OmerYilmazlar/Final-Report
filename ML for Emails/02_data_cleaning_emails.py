#!/usr/bin/env python3

"""
02_data_cleaning_emails.py

Prepares the email dataset for spam classification by:
 - Removing irrelevant columns (e.g., 'Email No.')
 - Validating data types and distributions.
 - Saving a cleaned version of the dataset.
"""

import pandas as pd

def main():
    csv_file_path = "emails.csv"
    
    # 1. Load the dataset
    print("Loading dataset...")
    df = pd.read_csv(csv_file_path)
    
    # 2. Drop irrelevant columns
    print("Removing irrelevant columns...")
    if 'Email No.' in df.columns:
        df = df.drop(columns=['Email No.'])
    
    # 3. Validate label column
    label_col = 'Prediction'  # Adjust if your label column name differs
    if label_col in df.columns:
        print("\n=== Distribution of labels ===")
        print(df[label_col].value_counts())
    else:
        raise ValueError(f"Label column '{label_col}' not found in the dataset.")
    
    # 4. Save cleaned dataset
    cleaned_file_path = "emails_cleaned.csv"
    df.to_csv(cleaned_file_path, index=False)
    print(f"\nCleaned dataset saved as {cleaned_file_path}")


if __name__ == "__main__":
    main()
