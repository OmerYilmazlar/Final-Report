#!/usr/bin/env python3

"""
03_model_training_emails.py

Trains a Random Forest model to classify emails as spam (1) or not spam (0).
Includes model evaluation and saves the trained model for later use.
"""

import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from joblib import dump

def main():
    csv_file_path = "emails_cleaned.csv"
    
    # 1. Load the cleaned dataset
    print("Loading cleaned dataset...")
    df = pd.read_csv(csv_file_path)
    
    # 2. Separate features (X) and target (y)
    print("Separating features and target...")
    X = df.drop(columns=['Prediction'])  # All word-count columns
    y = df['Prediction']                # Spam label (1 for spam, 0 for not spam)
    
    # 3. Train-test split (80% train, 20% test)
    print("Splitting dataset into training and testing sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # 4. Initialize the Random Forest classifier
    clf = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
    
    # 5. Cross-validation on training data
    print("Evaluating model using cross-validation...")
    scores = cross_val_score(clf, X_train, y_train, cv=5)
    print(f"Cross-Validation Accuracy: {scores.mean():.4f} ± {scores.std():.4f}")
    
    # 6. Train the model on the training set
    print("Training the Random Forest model...")
    clf.fit(X_train, y_train)
    
    # 7. Evaluate the model on the test set
    print("Evaluating model on the test set...")
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nTest Set Accuracy: {accuracy:.4f}")
    
    # Classification metrics
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # 8. Save the trained model
    model_file_path = "email_spam_rf.joblib"
    dump(clf, model_file_path)
    print(f"\nTrained model saved as {model_file_path}")


if __name__ == "__main__":
    main()
