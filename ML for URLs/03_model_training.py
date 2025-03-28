#!/usr/bin/env python3

"""
03_model_training.py

Trains a simple classification model (Random Forest) to detect phishing vs. legitimate.
Includes feature importance analysis.
"""

import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from joblib import dump  # Ensure joblib is imported
import matplotlib.pyplot as plt

def main():
    csv_file_path = "Phishing_Legitimate_cleaned.csv"
    
    # Load the dataset (including changes from cleaning if you saved a "cleaned" version)
    df = pd.read_csv(csv_file_path)
    
    # Separate features (X) and target (y)
    X = df.drop('CLASS_LABEL', axis=1)
    y = df['CLASS_LABEL']
    
    # Train-test split (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Initialize the Random Forest classifier
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    
    # Cross-validation to evaluate model stability
    print("Evaluating model using cross-validation...")
    scores = cross_val_score(clf, X_train, y_train, cv=5)
    print(f"Cross-Validation Accuracy: {scores.mean():.4f} ± {scores.std():.4f}")
    
    # Train (fit) the model
    print("Training the Random Forest model...")
    clf.fit(X_train, y_train)
    
    # Predict on test set
    y_pred = clf.predict(X_test)
    
    # Evaluate model
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nAccuracy: {accuracy:.4f}")
    
    # Classification report gives precision, recall, F1 for each class
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Feature Importance Analysis
    print("\nAnalyzing feature importance...")
    feature_importances = clf.feature_importances_
    feature_names = X.columns
    importance_df = pd.DataFrame({
        "Feature": feature_names,
        "Importance": feature_importances
    }).sort_values(by="Importance", ascending=False)

    print("\nTop 10 Features by Importance:")
    print(importance_df.head(10))

    # Plot feature importance
    plt.figure(figsize=(10, 8))
    plt.barh(importance_df["Feature"], importance_df["Importance"])
    plt.xlabel("Importance")
    plt.ylabel("Feature")
    plt.title("Feature Importance in Random Forest")
    plt.gca().invert_yaxis()  # Reverse order for better visualization
    plt.show()

    # Save the model
    dump(clf, "phishing_rf.joblib")
    print("Model saved as phishing_rf.joblib")


if __name__ == "__main__":
    main()
