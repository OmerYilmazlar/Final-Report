#!/usr/bin/env python3

import pandas as pd

def main():
    csv_file_path = "Phishing_Legitimate_full.csv"
    
    print("Loading dataset...")
    df = pd.read_csv(csv_file_path)
    
    print("\n=== First 5 rows of the dataset ===")
    print(df.head())
    
    print("\n=== Columns in the dataset ===")
    print(df.columns)
    
    print("\n=== Basic info about the DataFrame ===")
    print(df.info())
    
    # Since the dataset has 'CLASS_LABEL' (0 or 1),
    # let’s assume 1 = phishing, 0 = legitimate (we'll confirm).
    if 'CLASS_LABEL' in df.columns:
        print(f"\n=== Distribution of 'CLASS_LABEL' ===")
        print(df['CLASS_LABEL'].value_counts())
    else:
        print("\nThe dataset does not contain a 'CLASS_LABEL' column.")
    

if __name__ == "__main__":
    main()
