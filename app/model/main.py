# Run by streamlit run main.py
import streamlit as st
import gdown
import configparser
import os
from ultralytics import YOLO
import numpy as np
import torch
import cv2
import pickle
import numpy as np
import json
from keras.preprocessing import image
import tensorflow as tf
from keras.models import Model
from tensorflow.keras.utils import load_img, img_to_array
import tensorflow_addons as tfa
# from keras.applications.mobilenet_v3 import MobileNetV3Large, preprocess_input
from keras.applications.resnet import ResNet50, preprocess_input
# from keras.applications.vgg16 import VGG16, preprocess_input
# from keras.applications.inception_v3 import InceptionV3, preprocess_input
from PIL import Image
import datetime

CNN_CONFIG = '../../model/cnn/static/model_download_link.cfg'
cnn_output = '../../model/cnn/static/cnn_model.h5'
YOLO_CONFIG = '../../model/yolo/model_download_link.cfg'
yolo_output = '../../model/yolo/yolo.pt'
KNN_CONFIG = '../../model/knn/model_download_link.cfg'
knn_output = '../../model/knn/data/'
JSONFILE = '../dataset_build/Crawl_Data/summary.json'
SAVEDPATH = '../static/upload/'
CUTPATH = '../static/detect/'
DATABASEPATH = '../database/full_database/'
DATABASEINFORMATIONPATH = '../database/final_database.json/'
IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224
IMAGE_SIZE = (IMAGE_WIDTH, IMAGE_HEIGHT)
IMAGE_CHANNELS = 3

def read_config(file, pack, name):
    config = configparser.ConfigParser()
    config.readfp(open(file ,'r'))
    model_path = config.get(pack, name)
    model_path = model_path[1:-1]
    return f'https://drive.google.com/uc?id={model_path}'

def model_setup(CNN_CONFIG, cnn_output, YOLO_CONFIG, yolo_output):
    #CNN model
    cnn_link = read_config(CNN_CONFIG, 'model', 'CNN')
    isExist = os.path.exists(cnn_output)
    if (isExist == False):
        model_download(cnn_link, cnn_output)
    #YOLO model
    yolo_link = read_config(YOLO_CONFIG, 'model', 'YOLO')
    isExist = os.path.exists(yolo_output)
    if (isExist == False):
        model_download(yolo_link, yolo_output)

def knn_download(KNN_CONFIG, knn_output, category):
    knn_link = read_config(KNN_CONFIG, 'model', category)
    path = f'{knn_output}{category}_knn.pkl'
    isExist = os.path.exists(path)
    if (isExist == False):
        model_download(knn_link, path)
    return path
def category_detach(num):
    category = ''
    match num:
        case 0:
            category = 'dress'
        case 1:
            category = 'outwear'
        case 2:
            category = 'shirt'
        case 3:
            category = 'short'
        case 4:
            category = 'skirt'
        case 5:
            category = 'trouser'
        case _:
            print('Error')   
    return category
           
def streamlit_setup():
    PAGE_CONFIG = {"page_title":"Coduo", 
                #    "page_icon":image, 
                "layout":"centered", 
                "initial_sidebar_state":"auto"}  
    return PAGE_CONFIG

def model_download(link, output):
    gdown.download(link, output, quiet=False)

def get_embedding(model, imagename):
    img = load_img(imagename, target_size=(IMAGE_WIDTH, IMAGE_HEIGHT))
    x   = img_to_array(img)
    x   = np.expand_dims(x, axis=0)
    x   = preprocess_input(x)
    return model.predict(x).reshape(-1)

def save_file(uploaded_file):
    try:
        path = f'{SAVEDPATH}{uploaded_file.name}'
        with open(path, 'wb') as f:
            f.write(uploaded_file.getbuffer())
            return 1
    except:
        return 0

def readfile(PATH):
    with open(PATH, 'r') as f:
        temp = json.loads(f.read())
        name = temp['Name']
        cate = temp['Category']
        _id = temp['_id']
        org_price = temp['Original_Price']
        sale_price = temp['Sale_Price']
        record = {
            'Name': name,
            '_id': _id,
            'Original_Price': org_price,
            'Sale_Price': sale_price,
            'Category': cate
        }
    return record

def detect_process(yolomodel, cnnmodel):
    uploaded_file = st.file_uploader("Choose your image")
    bbox_array = []
    if uploaded_file is not None:
        dt_started = datetime.datetime.utcnow()  
        if save_file(uploaded_file):
            # display image
            path = f'{SAVEDPATH}{uploaded_file.name}'
            uploadimage = Image.open(path)
            width, height = uploadimage.size
            area = width * height
            st.image(uploaded_file)
            filename = uploaded_file.name[0:-4]
            detections = yolomodel.predict(uploadimage, imgsz=640, conf=0.39, iou=0.5)
            for detection in detections:                                       
                boxes = detection.boxes.numpy()                               
                for box in boxes:                                          
                    r = box.xyxy[0].astype(float)
                    category_detected = box.cls[0].astype(int)
                    bbox_area = (r[3] - r[1]) * (r[2] - r[0])
                    # bbox_array.append({
                    #         'category': category_detected,
                    #         'bbox': r
                    # })
                    if (bbox_area / area > 0.05):
                        bbox_array.append({
                            'category': category_detected,
                            'bbox': r
                        })
                    else:
                        pass
            num_detected = len(bbox_array)
            if num_detected == 0:
                st.write('Not found')
            else:
                dt_ended = datetime.datetime.utcnow()
                print('Time for YOLO: ' + str((dt_ended - dt_started).total_seconds()))
                choicearray = ()
                st.write('Found ' + str(num_detected) + ' results in your picture')
                cols = st.columns(num_detected)
                for i, result in enumerate(bbox_array):
                    ymin = result['bbox'][1]
                    ymax = result['bbox'][3]
                    xmin = result['bbox'][0]
                    xmax = result['bbox'][2]
                    crop_image = uploadimage.crop((xmin, ymin, xmax, ymax))
                    path = f'{CUTPATH}{filename}_{i}.jpg'
                    crop_image.save(path)
                for i, col in enumerate(cols):
                    path = f'{CUTPATH}{filename}_{i}.jpg'
                    col.image(path)
                    col.write(str(i + 1))
                    choicearray += (i + 1,)
                option = st.selectbox('Choose with clothes you want to find?', choicearray)
                st.write('You selected:', option)
                dt_started_new = datetime.datetime.utcnow()
                choice_detect = option - 1
                choose_category = category_detach(bbox_array[choice_detect]['category'])
                print(choose_category)
                knn_path = knn_download(KNN_CONFIG, knn_output, choose_category)
                loaded_model = pickle.load(open(knn_path, 'rb'))
                imagearray = get_embedding(cnnmodel, f'{CUTPATH}{filename}_{choice_detect}.jpg')
                distance, indices = loaded_model.kneighbors([imagearray])
                print(indices)
                print(distance)
                thislist = sorted(filter(lambda x: os.path.isfile(os.path.join(f'{DATABASEPATH}{choose_category}/', x)), os.listdir(f'{DATABASEPATH}{choose_category}/')))
                # show_result_1(f'{DATABASEPATH}{choose_category}/', thislist, indices, distance)
                show_result_2(f'{DATABASEPATH}{choose_category}/', thislist, indices, distance)
                
def show_result_1(path, thislist, indices, distance):
    for j in range(4):
        print(path + str(thislist[indices[0][j]*2]))
    col1, col2, col3, col4 = st.columns(4) 
    with col1:
        st.image(path + thislist[indices[0][0]*2])
        PATH = path + thislist[indices[0][0]*2 + 1]
        record = readfile(PATH)
        print('1')
        print(PATH)
        st.write(record['Name'])
        st.write('Original Price')
        st.write(record['Original_Price'])
        st.write('Sale Price')
        st.write(record['Sale_Price'])
        link = record['_id']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        print(link)
        st.markdown(link, unsafe_allow_html=True)
    with col2:
        st.image(path + thislist[indices[0][1]*2])
        PATH = path + thislist[indices[0][1]*2 + 1]
        record = readfile(PATH)
        print('2')
        print(PATH)
        st.write(record['Name'])
        st.write('Original Price')
        st.write(record['Original_Price'])
        st.write('Sale Price')
        st.write(record['Sale_Price'])
        link = record['_id']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        st.markdown(link, unsafe_allow_html=True)
    with col3:
        st.image(path + thislist[indices[0][2]*2])
        PATH = path + thislist[indices[0][2]*2 + 1]
        record = readfile(PATH)
        print('3')
        print(PATH)
        st.write(record['Name'])
        st.write('Original Price')
        st.write(record['Original_Price'])
        st.write('Sale Price')
        st.write(record['Sale_Price'])
        link = record['_id']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        st.markdown(link, unsafe_allow_html=True)
    with col4:
        st.image(path + thislist[indices[0][3]*2])
        PATH = path + thislist[indices[0][3]*2 + 1]
        record = readfile(PATH)
        print('4')
        print(PATH)
        st.write(record['Name'])
        st.write('Original Price')
        st.write(record['Original_Price'])
        st.write('Sale Price')
        st.write(record['Sale_Price'])
        link = record['_id']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        st.markdown(link, unsafe_allow_html=True)   

def get_data_array(image_num_array, DATABASEINFORMATIONPATH):
    data_array = []
    with open(DATABASEINFORMATIONPATH, 'r') as f:
        temp = json.loads(f.read())
    for item in image_num_array:
        data_array.append(temp[item])
    return data_array    
    
def show_result_2(path, thislist, indices, distance):
    image_num_array = []
    for j in range(4):
        image_num = int((thislist[indices[0][j]*2])[:-4])
        image_num_array.append(image_num)
    data_array = get_data_array(image_num_array, DATABASEINFORMATIONPATH)
    print(image_num_array)
    col1, col2, col3, col4 = st.columns(4) 
    with col1:
        st.image(data_array[0]['imageLink'])
        print('1')
        st.write(data_array[0]['name'])
        st.write('Original Price')
        st.write(data_array[0]['price_org'])
        st.write('Sale Price')
        st.write(data_array[0]['price_sale'])
        link = data_array[0]['_id']['$oid']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        print(link)
        st.markdown(link, unsafe_allow_html=True)
    with col2:
        st.image(data_array[1]['imageLink'])
        print('2')
        st.write(data_array[1]['name'])
        st.write('Original Price')
        st.write(data_array[0]['price_org'])
        st.write('Sale Price')
        st.write(data_array[0]['price_sale'])
        link = data_array[1]['_id']['$oid']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        print(link)
        st.markdown(link, unsafe_allow_html=True)
    with col3:
        st.image(data_array[2]['imageLink'])
        print('3')
        st.write(data_array[2]['name'])
        st.write('Original Price')
        st.write(data_array[0]['price_org'])
        st.write('Sale Price')
        st.write(data_array[0]['price_sale'])
        link = data_array[2]['_id']['$oid']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        print(link)
        st.markdown(link, unsafe_allow_html=True)
    with col4:
        st.image(data_array[3]['imageLink'])
        print('4')
        st.write(data_array[3]['name'])
        st.write('Original Price')
        st.write(data_array[0]['price_org'])
        st.write('Sale Price')
        st.write(data_array[0]['price_sale'])
        link = data_array[3]['_id']['$oid']
        link = '[Click here](http://localhost:3000/product/' + link +  ')'
        print(link)
        st.markdown(link, unsafe_allow_html=True)                  
                
def main():
    #Model Setup
    model_setup(CNN_CONFIG, cnn_output, YOLO_CONFIG, yolo_output)
    restored_model = tf.keras.models.load_model(cnn_output)
    secondmodel = Model(inputs = restored_model.input,
                                    outputs= restored_model.layers[3].output)
    yolomodel = YOLO(yolo_output)
    #Streamlit
    PAGE_CONFIG = streamlit_setup()
    st.set_page_config(**PAGE_CONFIG)
    detect_process(yolomodel, secondmodel)

if __name__ == "__main__":
    main()