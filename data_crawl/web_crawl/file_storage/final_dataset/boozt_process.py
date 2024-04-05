import json

f = open('boozt_data.json')
data = json.load(f)
length = len(data)
for item in data:
    item["imageLink"] = item.pop("image_link")
    if item["category"] == "jeans":
        item["category"] = "trouser"
    elif item["category"] == "poloshirts":
        item["category"] = "shirt"
    elif item["category"] == "shirts":
        item["category"] = "shirt"
    elif item["category"] == "shorts":
        item["category"] = "short"
    elif item["category"] == "trousers":
        item["category"] = "trouser"
    elif item["category"] == "jean":
        item["category"] = "trouser"
    elif item["category"] == "skirts":
        item["category"] = "skirt"
    else:
        pass

with open('boozt_summary.json', 'w') as output_file:
        json.dump(data, output_file)
    
            