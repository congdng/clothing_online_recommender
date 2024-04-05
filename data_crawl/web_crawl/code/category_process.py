import json

category_list = []
def category(file):
    f = open(file)
    data = json.load(f)
    length = len(data)
    for i in range(length):
        category = data[i]["category"]
        # data[i]['no'] = i
        if data[i]["category"] == 'jacket':
            data[i]["category"] = 'outwear'
        if category not in category_list:
            category_list.append(category)
        else:
            pass
    print(category_list)
    # with open('summary1.json', 'w') as output_file:
        # json.dump(data, output_file, indent=4)
            
category('summary1.json')