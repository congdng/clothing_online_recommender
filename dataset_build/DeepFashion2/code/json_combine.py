import json

TRAINFOLDER = 'E:/clothing_online_store/dataset/DeepFashion2/train/annos/'
VALIDFOLDER = 'E:/clothing_online_store/dataset/DeepFashion2/validation/annos/'
TRAINNUM = 191961
VALIDNUM = 32153
TRAINJSONPATH = 'train_summary.json'
VALIDJSONPATH = 'valid_summary.json'

#Use to combine all the json in the Dataset to one main json file

traindataset = {
    "item": {},
    "info": []
}

validdataset ={
    "item": {},
    "info": []
}

def combine_json(FOLDERPATH, num_of_images, datadict):
    j = 1
    for num in range(num_of_images):
        name = FOLDERPATH + str(num).zfill(6) + '.json'
        imagename = str(num).zfill(6) + '.jpg'
        if (num > 0):
            with open(name, 'r') as f:
                temp = json.loads(f.read())
                for i in temp:
                    if i == 'source' or i=='pair_id':
                        continue
                    else:
                        pair = temp['pair_id']
                        box = temp[i]['bounding_box']
                        bbox=[box[0],box[1],box[2],box[3]]
                        cat = temp[i]['category_id']
                        scale = temp[i]['scale']
                        occlusion = temp[i]['occlusion']
                        viewpoint = temp[i]['viewpoint']
                        zoom = temp[i]['zoom_in']
                        style = temp[i]['style']
                        datadict['info'].append({
                            "no": j,
                            "pair": pair,
                            "style": style,
                            "categories": cat,
                            "boundingbox": bbox,
                            "image": imagename,
                            "scale": scale,
                            "occlusion": occlusion,
                            "viewpoint": viewpoint,
                            "zoom": zoom,
                        })
                    j += 1
    print(len(datadict['info']))

def exportjson(JSONPATH, datadict):
    json_name = JSONPATH
    with open(json_name, 'w') as f:
        json.dump(datadict, f)
        print('Data extracted')

def main():
    print('------Start------')
    combine_json(TRAINFOLDER, TRAINNUM, traindataset)
    print('------Done Process 1------')
    combine_json(VALIDFOLDER, VALIDNUM, validdataset)
    print('------Done Process 2------')
    exportjson(TRAINJSONPATH, traindataset)
    print('------Done Process 3------')
    exportjson(VALIDJSONPATH, validdataset)
    print('------End------')

if __name__ == '__main__':
    main()

