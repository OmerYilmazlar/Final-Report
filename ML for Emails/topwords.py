import pandas as pd

# Load cleaned dataset
df = pd.read_csv("emails_cleaned.csv")

# Extract top 3000 words (assumes these are all columns except 'Prediction')
top_words = list(df.columns[:-1])  # Exclude the label column

# Save as JavaScript array
with open("top_words.js", "w") as f:
    f.write("const topWords = [\n")
    f.write(",\n".join(f'"{word}"' for word in top_words))
    f.write("\n];\n")
