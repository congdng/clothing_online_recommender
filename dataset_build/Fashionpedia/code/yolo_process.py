import os
import numpy as np
import warnings
warnings.filterwarnings('ignore')
import glob
import cv2
import os 
import json
import random

TRAINNUM = 43439
VALIDNUM = 1071
TRAINIMAGEFOLDER = 'E:/clothing_online_store/dataset/Fashionpedia/train/clothes_image/'
VALIDIMAGEFOLDER = 'E:/clothing_online_store/dataset/Fashionpedia/validation/clothes_image/'
TRAINJSONFOLDER = 'E:/clothing_online_store/dataset/Fashionpedia/train/clothes_annos/'
VALIDJSONFOLDER = 'E:/clothing_online_store/dataset/Fashionpedia/validation/clothes_annos/'
TRAINJSONPATH = 'train_summary.json'
VALIDJSONPATH = 'valid_summary.json'
SAVEDVALIDPATH = 'validation/test/'
SAVEDTRAINPATH = 'train/test/'


def image_summary(FOLDER, image_set):
    read_files = glob.glob(f'{FOLDER}/*.json')
    x = len(FOLDER)
    for file in read_files:
        image_set.append(file[x:-5])
    image_set = np.unique(image_set)
    return image_set
    
def yolo_file(num, FOLDER, JSONFOLDER, IMAGEFOLDER, dataset, image_set, temporary_category):
    is_valid = False
    name = JSONFOLDER + image_set[num] + '.json'
    imageName = image_set[num] + '.jpg'
    print(name)
    print(imageName)
    with open(name, 'r') as f:
        temp = json.loads(f.read())
        for i in temp:
            if i == 'clothes':
                for cloth in temp[i]:
                    category = cloth['category']
                    # if (len(temp[i]) > 1 and category == 2):
                    if (category == 3):
                        is_valid = True
                        image = cv2.imread(IMAGEFOLDER + imageName)
                        cv2.imwrite(FOLDER + imageName, image)
                        imgheight, imgwidth, imgchannels = image.shape
                        for cloth in temp[i]:
                            # print(cloth)
                            category = cloth['category']
                            temporary_category[category] += 1
                            bbox = cloth['boundingbox']
                            xcenter = ((bbox[0] * 2 + bbox[2]) / 2) / imgwidth
                            ycenter = ((bbox[1] * 2 + bbox[3]) / 2) / imgheight
                            width = bbox[2] / imgwidth
                            height = bbox[3] / imgheight
                            dataset['info'].append({
                                "categories": category,
                                "xcenter": xcenter,
                                "ycenter": ycenter,
                                "width": width,
                                "height": height
                            })
                        break
                    else:
                        pass
        f.close()
    return is_valid

def write_to_file(FOLDER, num, dataset):
    with open(FOLDER + num + '.txt', 'w+') as f:
        for i in range(len(dataset['info'])):
            f.write(str(dataset['info'][i]['categories']) + ' ' + 
                    str(dataset['info'][i]['xcenter']) + ' ' +
                    str(dataset['info'][i]['ycenter']) + ' ' +
                    str(dataset['info'][i]['width']) + ' ' +
                    str(dataset['info'][i]['height']) +
                    '\n')
        f.close()
   
def cut_image(FOLDER, JSONPATH, IMAGEFOLDER, num_of_images, run_time, image_set, stop_num, target_image):
    initial_category = [0, 0, 0, 0, 0, 0]
    counter = 0
    num_image = 0
    while counter < run_time:
        temporary_category = [0, 0, 0, 0, 0, 0]
        s = random.randint(0, num_of_images - 1)
        name = JSONPATH + image_set[s] + '.json'
        counter += 1
        STOPINDICATOR = False
        og = []
        temp1 = []
        for initial_num in range(len(initial_category)):
            if initial_num!=0: #and initial_num!=2 and initial_num!=3:
                og.append(initial_category[initial_num])
        for temp_num in range(len(temporary_category)):
            if temp_num!=0: #and temp_num!=2 and temp_num!=3:
                temp1.append(temporary_category[temp_num])
        for index, item in enumerate(og):
            if (item + temp1[index] > stop_num):
                STOPINDICATOR = True
                break
        if (not STOPINDICATOR):
            yolodataset = {
                "item": {},
                "info": []
            }
            is_valid = yolo_file(s, FOLDER, TRAINJSONFOLDER, IMAGEFOLDER, yolodataset, image_set, temporary_category)
            if (is_valid == True):
                print(yolodataset)
                initial_category = np.add(initial_category, temporary_category)
                write_to_file(FOLDER, image_set[s], yolodataset)
                yolodataset.clear()
                num_image += 1
            else :
                pass
        elif all(item >= stop_num for item in initial_category) and num_image > target_image:
            break
        else:
            pass
        print(initial_category)
            
        
def main():
    image_set = []
    print('------Start------')
    image_summary(TRAINJSONFOLDER, image_set)
    cut_image(SAVEDTRAINPATH, TRAINJSONFOLDER, TRAINIMAGEFOLDER, TRAINNUM, 50000000, image_set, 300, 300)
    print('------End------')

if __name__ == '__main__':
    main()


# def write_to_file(YOLOTRAINPATH, num, dataset):
#     with open(YOLOTRAINPATH + str(num).zfill(6) + '.txt', 'w+') as f:
#         for i in range(len(dataset['info'])):
#             f.write(str(dataset['info'][i]['categories']) + ' ' + 
#                     str(dataset['info'][i]['xcenter']) + ' ' +
#                     str(dataset['info'][i]['ycenter']) + ' ' +
#                     str(dataset['info'][i]['width']) + ' ' +
#                     str(dataset['info'][i]['height']) +
#                     '\n')
#         f.close()

# def cut_image(FOLDERSAVEPATH, JSONPATH, STOREPATH, num_of_images, num_of_category_images):
#     initial_category = [0, 14, 0, 0, 0, 14]
#     counter = 0
#     num_image = 0
#     while (counter < num_of_category_images):
#         temporary_category = [0, 0, 0, 0, 0, 0]
#         s = random.randint(1, num_of_images - 1)
#         name = JSONPATH + str(s).zfill(6) + '.json'
#         with open(name, 'r') as f:
#             temp = json.loads(f.read())
#             VALID = False
#             for i in temp:
#                 if i == 'source' or i=='pair_id':
#                     continue
#                 else:
#                     cat = category_process(temp[i]['category_id'])
#                     scale = temp[i]['scale']
#                     occlusion = temp[i]['occlusion']
#                     viewpoint = temp[i]['viewpoint']
#                     zoom = temp[i]['zoom_in']
#                     if scale != 1 and occlusion == 1 and viewpoint != 3 and zoom ==1:
#                         VALID = True
#                         temporary_category[cat] += 1
#                     else:
#                         VALID = False
#                         temporary_category = [0, 0, 0, 0, 0, 0]
#                         break
#             STOPINDICATOR = False
#             if VALID:
#                 og = []
#                 temp1 = []
#                 for initial_num in range(len(initial_category)):
#                     if initial_num!=0: #and initial_num!=2 and initial_num!=3:
#                         og.append(initial_category[initial_num])
#                 for temp_num in range(len(temporary_category)):
#                     if temp_num!=0: #and temp_num!=2 and temp_num!=3:
#                         temp1.append(temporary_category[temp_num])
#                 for index, item in enumerate(og):
#                     if (item + temp1[index] > 14):
#                         STOPINDICATOR = True
#                         break 
#                 if (not STOPINDICATOR):
#                     print('temp')
#                     print(temporary_category)
#                     print('initial')
#                     print(initial_category)
#                     yolodataset = {
#                         "item": {},
#                         "info": []
#                     }
#                     is_valid = yolo_file(s, FOLDERSAVEPATH, STOREPATH, JSONPATH, yolodataset)
#                     if (is_valid == True):
#                         initial_category = np.add(initial_category, temporary_category)
#                         write_to_file(YOLOTRAINPATH, s, yolodataset)
#                         yolodataset.clear()
#                         num_image += 1
#                     else :
#                         pass
#                 elif all(item >= 14 for item in initial_category) and num_image > 1500:
#                     print(num_image)
#                     break
#                 else:
#                     pass
#         counter += 1
#     print('Final:' + str(initial_category))
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()

# def main():
#     print('------Start------')
#     cut_image(YOLOTRAINPATH, TRAINJSONFOLDER, TRAINIMAGEFOLDER, VALIDNUM, 500000000)
#     print('------End------')

# if __name__ == '__main__':
#     main()