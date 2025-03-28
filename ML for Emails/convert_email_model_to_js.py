#!/usr/bin/env python3

"""
convert_email_model_to_js.py

Converts the trained email spam detection model into a JavaScript implementation using m2cgen.
"""

import m2cgen as m2c
from joblib import load

def main():
    # 1) Load your trained model
    model = load("email_spam_rf.joblib")  # Adjust file name as needed

    # 2) Generate JavaScript code
    print("Converting the model to JavaScript...")
    js_code = m2c.export_to_javascript(model)

    # 3) Write the JavaScript code to a file
    output_file = "email_rf_model.js"  # Adjust output file name if needed
    with open(output_file, "w") as f:
        f.write(js_code)

    print(f"Model successfully exported to {output_file} using m2cgen")

if __name__ == "__main__":
    main()
