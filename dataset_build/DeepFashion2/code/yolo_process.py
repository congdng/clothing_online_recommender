import os
import numpy as np
import warnings
warnings.filterwarnings('ignore')

import cv2
import os 
import json
import random

TRAINNUM = 191961
VALIDNUM = 32153
TRAINIMAGETOTAL = 312184
VALIDIMAGETOTAL = 52489
TRAINFOLDER = 'E:/clothing_online_store/dataset/DeepFashion2/validation/image/'
VALIDFOLDER = 'E:/clothing_online_store/dataset/DeepFashion2/validation/image/'
TRAINJSONFOLDER = 'E:/clothing_online_store/dataset/DeepFashion2/validation/annos/'
TRAINJSONPATH = 'train_summary.json'
VALIDJSONPATH = 'valid_summary.json'
YOLOTRAINPATH = 'test/'

def category_process(category):
    if (category == 1) | (category == 2) | (category == 5) | (category == 6): #shirt
        category = 0
    elif (category == 3) | (category == 4): #outwear
        category = 1
    elif (category == 7): #short
        category = 2
    elif (category == 8): #trouser
        category = 3
    elif (category == 9): #skirt
        category = 4
    else:                   #dress
        category = 5
    return category

def yolo_file(num, FOLDERSAVEPATH, STOREPATH, TRAINJSONFOLDER, dataset):
    is_valid = False
    name = TRAINJSONFOLDER + str(num).zfill(6) + '.json'
    imagename = str(num).zfill(6) + '.jpg'
    with open(name, 'r') as f:
        temp = json.loads(f.read())
        for i in temp:
            if i == 'source' or i=='pair_id':
                continue
            else:
                temp_category = category_process(temp[i]['category_id'])
        if (len(temp) > 3 and temp_category == 3) or (temp_category == 3):
            is_valid = True
            for i in temp:
                image = cv2.imread(STOREPATH + imagename)
                cv2.imwrite(FOLDERSAVEPATH + imagename, image)
                imgheight, imgwidth, imgchannels = image.shape
                if i == 'source' or i=='pair_id':
                    continue
                else:
                    box = temp[i]['bounding_box']
                    xcenter = ((box[0] + box[2]) / 2) / imgwidth
                    ycenter = ((box[1] + box[3]) / 2) / imgheight
                    width = (box[2] - box[0]) / imgwidth
                    height = (box[3] - box[1]) / imgheight
                    cat = category_process(temp[i]['category_id'])
                    dataset['info'].append({
                        "categories": cat,
                        "xcenter": xcenter,
                        "ycenter": ycenter,
                        "width": width,
                        "height": height
                    })
        else:
            pass
    return is_valid

def write_to_file(YOLOTRAINPATH, num, dataset):
    with open(YOLOTRAINPATH + str(num).zfill(6) + '.txt', 'w+') as f:
        for i in range(len(dataset['info'])):
            f.write(str(dataset['info'][i]['categories']) + ' ' + 
                    str(dataset['info'][i]['xcenter']) + ' ' +
                    str(dataset['info'][i]['ycenter']) + ' ' +
                    str(dataset['info'][i]['width']) + ' ' +
                    str(dataset['info'][i]['height']) +
                    '\n')
        f.close()

def cut_image(FOLDERSAVEPATH, JSONPATH, STOREPATH, num_of_images, num_of_category_images):
    initial_category = [0, 14, 0, 0, 0, 14]
    counter = 0
    num_image = 0
    while (counter < num_of_category_images):
        temporary_category = [0, 0, 0, 0, 0, 0]
        s = random.randint(1, num_of_images - 1)
        name = JSONPATH + str(s).zfill(6) + '.json'
        with open(name, 'r') as f:
            temp = json.loads(f.read())
            VALID = False
            for i in temp:
                if i == 'source' or i=='pair_id':
                    continue
                else:
                    cat = category_process(temp[i]['category_id'])
                    scale = temp[i]['scale']
                    occlusion = temp[i]['occlusion']
                    viewpoint = temp[i]['viewpoint']
                    zoom = temp[i]['zoom_in']
                    if scale != 1 and occlusion == 1 and viewpoint != 3 and zoom ==1:
                        VALID = True
                        temporary_category[cat] += 1
                    else:
                        VALID = False
                        temporary_category = [0, 0, 0, 0, 0, 0]
                        break
            STOPINDICATOR = False
            if VALID:
                og = []
                temp1 = []
                for initial_num in range(len(initial_category)):
                    if initial_num!=0: #and initial_num!=2 and initial_num!=3:
                        og.append(initial_category[initial_num])
                for temp_num in range(len(temporary_category)):
                    if temp_num!=0: #and temp_num!=2 and temp_num!=3:
                        temp1.append(temporary_category[temp_num])
                for index, item in enumerate(og):
                    if (item + temp1[index] > 14):
                        STOPINDICATOR = True
                        break 
                if (not STOPINDICATOR):
                    print('temp')
                    print(temporary_category)
                    print('initial')
                    print(initial_category)
                    yolodataset = {
                        "item": {},
                        "info": []
                    }
                    is_valid = yolo_file(s, FOLDERSAVEPATH, STOREPATH, JSONPATH, yolodataset)
                    if (is_valid == True):
                        initial_category = np.add(initial_category, temporary_category)
                        write_to_file(YOLOTRAINPATH, s, yolodataset)
                        yolodataset.clear()
                        num_image += 1
                    else :
                        pass
                elif all(item >= 14 for item in initial_category) and num_image > 1500:
                    print(num_image)
                    break
                else:
                    pass
        counter += 1
    print('Final:' + str(initial_category))
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def main():
    print('------Start------')
    cut_image(YOLOTRAINPATH, TRAINJSONFOLDER, TRAINFOLDER, VALIDNUM, 500000000)
    print('------End------')

if __name__ == '__main__':
    main()