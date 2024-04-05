import json
category_array = ['shirt', 'outwear', 'short', 'trouser', 'skirt', 'dress']

TRAINFILE = 'train/annos/file.json'
VALIDFILE = 'validation/annos/file.json'
TRAINJSONPATH = 'train_summary.json'
VALIDJSONPATH = 'valid_summary.json'

validdataset ={
    "item": {},
    "info": []
}

traindataset = {
    "item": {},
    "info": []
}

def exportjson(JSONPATH, datadict):
    json_name = JSONPATH
    with open(json_name, 'w') as f:
        json.dump(datadict, f)
        print('Data extracted')
        
def read_file(file, dataset):        
    with open (file, 'r') as f:
        temp = json.loads(f.read())
        imagenum = len(temp['annotations'])
        count = 0
        for annotation in temp['annotations']:
            count += 1
            ratio = count / imagenum * 100
            print(f'{ratio}%')
            for item in temp['images']:
                image_id = item['id']
                if image_id == annotation['image_id']:
                    image_link = item['file_name']
                    category = annotation['category_id']
                    bbox = annotation['bbox']
                    area = annotation['area']
                    if (category < 11 or category == 12) and area > 20000:
                        if (category < 3):
                            category = 0
                        elif (category == 3) or (category == 4) or (category == 5) or  (category == 9) or (category == 12):
                            category = 1
                        elif (category == 7):
                            category = 2
                        elif (category == 6):
                            category = 3
                        elif (category == 8):
                            category = 4
                        else:
                            category = 5
                        dataset['info'].append({
                                "category": category,
                                "boundingbox": bbox,
                                "imageLink": image_link,
                                "imageID" : image_id,
                                "categoryName": category_array[category]
                        })
                        
    print(len(dataset['info']))

def main():
    print('------Start------')
    read_file(TRAINFILE, traindataset)
    print('------Done Process 1------')
    read_file(VALIDFILE, validdataset)
    print('------Done Process 2------')
    exportjson(TRAINJSONPATH, traindataset)
    print('------Done Process 3------')
    exportjson(VALIDJSONPATH, validdataset)
    print('------End------')

if __name__ == '__main__':
    main()