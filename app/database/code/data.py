import json
import cv2

CRAWLFILE = '../final_database.json'
DATAPATH = '../full_database/'
data = []
with open(CRAWLFILE, 'r') as f:
    temp = json.loads(f.read())
    for s in range(len(temp)):
        name = temp[s]['name']
        cate = temp[s]['category']
        _id = temp[s]['_id']['$oid']
        price_org = temp[s]['price_org']
        price_sale = temp[s]['price_sale']
        record = {
            'Name': name,
            '_id': _id,
            'Original_Price': price_org,
            'Sale_Price': price_sale,
            'Category': cate
        }
        data.append(record)
        category = record['Category']
        num = str(s).zfill(6)
        PATH = f'{DATAPATH}{category}/{num}.json'
        with open(PATH, 'w') as f:
            json.dump(record, f)
    print('Done')
    