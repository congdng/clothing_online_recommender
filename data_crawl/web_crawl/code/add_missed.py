import json
import random

# f = open('file_storage/initial_dataset/farfetch_summary.json')
f = open('boozt_summary.json')

data = json.load(f)
length = len(data)
for i in range(length):
    data[i]["description"]= """
    About the product
    - Material: 100% organic cotton
    - Fine wash at max. 30˚C
    - Do not use bleach
    - Tumble dry at high setting or max 80˚C
    - Iron at maximum temperature of 110°C
    - Dry cleaning recommended
    """
    data[i]["countInStock"] = random.randint(0, 60)
    data[i]["rating"] = round(random.uniform(1.00, 5.00), 2)
    data[i]["numReviews"] = random.randint(0, 60)
    data[i]["price_org"] = round(random.uniform(33.33, 666.66), 2)
    data[i]["price_sale"] = round(data[i]["price_org"] * round(random.uniform(0.5, 1), 2) ,2)
    

# with open('farfetch_summary_1.json', 'w') as output_file:
with open('boozt_summary_1.json', 'w') as output_file:
    json.dump(data, output_file)