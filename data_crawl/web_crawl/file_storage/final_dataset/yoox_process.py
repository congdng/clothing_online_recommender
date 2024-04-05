import json

f = open('yoox_data.json')
data = json.load(f)
length = len(data)
for item in data:
    # print(item)
    item["brand"] = item.pop("brands")
    item["price_org"] = float(item["price_org"].replace(",", ""))
    item["price_sale"] = float(item["price_sale"].replace(",", ""))
    if item["category"] == "Coats & Jackets":
        item["category"] = "outwear"
    elif item["category"] == "Shorts & Bermuda":
        item["category"] = "short"
    elif item["category"] == "Pants":
        item["category"] = "trouser"
    elif item["category"] == "Shirts":
        item["category"] = "shirt"
    elif item["category"] == "T-Shirts and Tops":
        item["category"] = "shirt"
    elif item["category"] == "Skirts":
        item["category"] = "skirt"
    elif item["category"] == "Dresses":
        item["category"] = "dress"
    elif item["category"] == "Hooded sweatshirts":
        item["category"] = "shirt"
    else:
        pass

with open('yoox_summary.json', 'w') as output_file:
        json.dump(data, output_file)
    
            