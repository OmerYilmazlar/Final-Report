#!/usr/bin/env python3

"""
01_data_exploration_emails.py

Explores the 'emails.csv' file, which contains:
 - 5172 emails
 - 3002 columns:
     - 1st column: Email name (anonymized)
     - Next 3000 columns: counts of the 3000 most common words
     - Last column: label (1 for spam, 0 for not spam)
"""

import pandas as pd

def main():
    # Path to the emails CSV (adjust if needed)
    csv_file_path = "emails.csv"
    
    # 1. Load the dataset
    print("Loading dataset...")
    df = pd.read_csv(csv_file_path)
    
    # 2. Basic info about DataFrame
    print("\n=== Basic info about the DataFrame ===")
    print(df.info())
    
    # 3. Inspect the first few rows
    print("\n=== First 5 rows ===")
    print(df.head())
    
    # 4. List the columns
    print("\n=== Columns in the dataset ===")
    print(df.columns)
    
    # 5. Check for missing values
    print("\n=== Missing values in each column ===")
    print(df.isnull().sum())
    
    # 6. Check label distribution
    #    (Assuming the last column is named 'SpamLabel' or similar:
    #     e.g., 'label' or 'CLASS_LABEL' – adjust if needed.)
    label_col = df.columns[-1]  # the last column
    print(f"\n=== Distribution of '{label_col}' ===")
    print(df[label_col].value_counts())

if __name__ == "__main__":
    main()