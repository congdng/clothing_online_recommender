import json

f = open('darveys_data.json')
data = json.load(f)
length = len(data)
for item in data:
    item["brand"] = item.pop("brands")
    item["price_org"] = round(int(item["price_org"].replace(",", "")) * 0.012, 2)
    item["price_sale"] = round(int(item["price_sale"].replace(",", "")) *0.012 , 2)
    if item["category"] == "Sweatshirts & hoodies":
        item["category"] = "shirt"
    elif item["category"] == "Jackets":
        item["category"] = "outwear"
    elif item["category"] == "Jeans":
        item["category"] = "trouser"
    elif item["category"] == "Sweaters & knitwear":
        item["category"] = "shirt"
    elif item["category"] == "Pants":
        item["category"] = "trouser"
    elif item["category"] == "Polos":
        item["category"] = "shirt"
    elif item["category"] == "Shirts":
        item["category"] = "shirt"
    elif item["category"] == "Shorts":
        item["category"] = "short"
    elif item["category"] == "T-shirts":
        item["category"] = "shirt"
    elif item["category"] == "Trench coats":
        item["category"] = "outwear"
    elif item["category"] == "Dresses":
        item["category"] = "dress"
    elif item["category"] == "Skirts":
        item["category"] = "skirt"
    elif item["category"] == "Tops":
        item["category"] = "shirt"
    else:
        pass

with open('darveys_summary.json', 'w') as output_file:
        json.dump(data, output_file)
    
            