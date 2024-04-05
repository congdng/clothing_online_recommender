import json
PATH1 = '../../dataset_build/Crawl_Data/summary.json'
PATH2 = './products.json'
def exportjson(data):
    with open('final_database.json', 'w') as f:
        json.dump(data, f, indent=4)
        print('Data extracted')
        
with open(PATH1) as f1, open(PATH2) as f2:
    first_list = json.load(f1)
    second_list = json.load(f2)
for i, v in enumerate(second_list):
    # print(v)
    first_list[i].update(v)
exportjson(first_list)

