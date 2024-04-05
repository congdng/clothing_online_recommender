import json

f = open('stylenanda_data.json')
data = json.load(f)
length = len(data)
for item in data:
    item["imageLink"] = item.pop("image_link")
    item["price_org"] = float(item["price_org"][1:-4])
    item["price_sale"] = float(item["price_sale"][2:-4])
    if item["category"] == "shorts":
        item["category"] = "short"
    elif item["category"] == "trousers":
        item["category"] = "trouser"
    elif item["category"] == "jacket":
        item["category"] = "outwear"
    else:
        pass

with open('stylenanda_summary.json', 'w') as output_file:
        json.dump(data, output_file)
    
            