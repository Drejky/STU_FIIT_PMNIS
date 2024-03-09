import os
import json
from bs4 import BeautifulSoup
import codecs

def process_html_file(file_path):
    with codecs.open(file_path, 'r', 'utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    table = soup.find('tbody')
    elements = table.select('td')

    stops = []

    for element in elements:
        if element.a:
            if element.span:
                stops.append(element.a.span.text.strip())
            else:
                stops.append(element.a.text.strip())
        else:
            if element.span:
                stops.append(element.span.text.strip()) 
            else:
                stops.append(element.text.strip())

    stops = [stop for stop in stops if stop.strip()]
    return stops

# Get a list of all files in the directory
files = os.listdir('./sites')

for file in files:
    # Check if the file is an HTML file
    if file.endswith('.htm'):
        # Extract the number from the file name
        number = file.split(' ')[1]

        # Open the HTML file
        with codecs.open(f'./sites/{file}', 'r', 'utf-8') as f:
            html = f.read()

        stops = process_html_file(f'./sites/{file}')

        # Save the stops into a JSON file
        with open(f'{number}_stop.json', 'w') as f:
            json.dump(stops, f)