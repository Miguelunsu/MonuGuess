import pandas as pd

# Read the Excel file
df = pd.read_csv("Landmarks_English_CSV.csv", encoding="ISO-8859-1")
df = df.replace("'", "\\'", regex=True)
print(df.head(20))

# Extract the required columns and convert to dictionary
data = df[['id', 'Name', 'Country', 'Continent','Description']].to_dict(orient='records')

# Create a string in the desired format
landmarks = "const landmarks = [\n"
for d in data:
    landmarks += f"\t{{id: {d['id']}, name: '{d['Name']}', country: '{d['Country']}', continent: '{d['Continent']}'}}"

    # Add a comma to all but the last item in the list
    if d != data[-1]:
        landmarks += ','
    
    landmarks += '\n'

landmarks += "];"

# Write the output to a file
with open('MonuGuess_Js_Landmarks.txt', 'w') as f:
    f.write(landmarks)

print('Output landmarks written to file.')

# Create a string in the desired format
descriptions = "const descriptions = [\n"
for d in data:
    descriptions += f"\t{{id: {d['id']}, description: '{d['Description']}'}}"

    # Add a comma to all but the last item in the list
    if d != data[-1]:
        descriptions += ','
    
    descriptions += '\n'

descriptions += "];"

# Write the output to a file
with open('MonuGuess_Js_Descriptions.txt', 'w') as f:
    f.write(descriptions)

print('Output descriptions written to file.')