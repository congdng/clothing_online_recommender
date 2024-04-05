import json

f = open('farfetch_data.json')
data = json.load(f)
length = len(data)
for item in data:
    item["brand"] = item.pop("brands")
    item["price_org"] = int(item["price_org"][1:].replace(",", ""))
    item["price_sale"] = int(item["price_sale"][1:].replace(",", ""))
    if item["category"] == "Coats":
        item["category"] = "outwear"
    elif item["category"] == "Jackets":
        item["category"] = "outwear"
    elif item["category"] == "Shirts":
        item["category"] = "shirt"
    elif item["category"] == "Shorts":
        item["category"] = "short"
    elif item["category"] == "Pants":
        item["category"] = "trouser"
    elif item["category"] == "T-Shirts & Vests":
        item["category"] = "shirt"
    elif item["category"] == "Sweatshirts & Knitwear":
        item["category"] = "shirt"
    elif item["category"] == "Polo Shirts":
        item["category"] = "shirt"
    elif item["category"] == "Dresses":
        item["category"] = "dress"
    elif item["category"] == "Skirts":
        item["category"] = "skirt"
    else:
        pass

with open('farfetch_summary.json', 'w') as output_file:
        json.dump(data, output_file)
    
            