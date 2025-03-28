#!/usr/bin/env python3

import m2cgen as m2c
from joblib import load

def main():
    # 1) Load your trained model
    model = load("phishing_rf.joblib")

    # 2) Generate JavaScript code
    js_code = m2c.export_to_javascript(model)

    # 3) Write it to a JS file
    with open("rf_model.js", "w") as f:
        f.write(js_code)

    print("Model successfully exported to rf_model.js using m2cgen")

if __name__ == "__main__":
    main()
