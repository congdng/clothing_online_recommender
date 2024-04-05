import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Model
# from keras.applications.mobilenet_v3 import MobileNetV3Large, preprocess_input
from keras.applications.resnet import ResNet50, preprocess_input
# from keras.applications.vgg16 import VGG16, preprocess_input
# from keras.applications.inception_v3 import InceptionV3, preprocess_input
import json
import pandas as pd
import numpy as np
from keras.preprocessing import image
from tensorflow.keras.utils import load_img, img_to_array
import tensorflow_addons as tfa
import gdown
import configparser
import os

CONFIG = '../static/model_download_link.cfg'
output = '../static/cnn_model.h5'
JSONFILE = '../../../dataset_build/Crawl_Data/summary.json'
DATA_PATH = '../../../app/database/full_database/'
EMBEDDINGS = '../static/embeddings.json'
FAILEMBEDDINGS = '../static/failembeddings.json'
lr = 0.001
wd = lr * 1e-2
IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224
IMAGE_SIZE = (IMAGE_WIDTH, IMAGE_HEIGHT)
IMAGE_CHANNELS = 3

#With the already trained model, run and get the 2048-number array from the crawl images.

dataset = {
    "item": {},
    "info": []
}
fail =[]
def read_config(file):
    config = configparser.ConfigParser()
    config.readfp(open(file ,'r'))
    model_path = config.get('model', 'CNN')
    model_path = model_path[1:-1]
    return f'https://drive.google.com/uc?id={model_path}'

def model_download(link, output):
    gdown.download(link, output, quiet=False)
    
def get_embedding(model, imagename):
    img = load_img(imagename, target_size=(IMAGE_WIDTH, IMAGE_HEIGHT))
    x   = img_to_array(img)
    x   = np.expand_dims(x, axis=0)
    x   = preprocess_input(x)
    return model.predict(x).reshape(-1)

#---Main---
model_link = read_config(CONFIG)
isExist = os.path.exists(output)
if (isExist == False):
    model_download(model_link, output)
restored_model = tf.keras.models.load_model(output)
opt = tfa.optimizers.AdamW(learning_rate = lr, weight_decay = wd)
restored_model.compile(loss = 'categorical_crossentropy', optimizer = opt , metrics=[tf.keras.metrics.CategoricalAccuracy()])
secondmodel = Model(inputs = restored_model.input, outputs= restored_model.layers[3].output)
print(secondmodel.summary())
secondmodel.compile(loss = 'categorical_crossentropy', optimizer = opt , metrics=[tf.keras.metrics.CategoricalAccuracy()])
with open(JSONFILE, 'r') as f:
    temp = json.loads(f.read())
    # for i in range(40000):
    # for i in range(66106, 66109):
    for i in range(len(temp)):
        try:
            category = str(temp[i]['category'])
            name = str(temp[i]['name'])
            url = str(temp[i]['url'])
            price_org= str(temp[i]['price_org'])
            price_sale= str(temp[i]['price_sale'])
            imagelink = str(temp[i]['imageLink'])
            img = DATA_PATH + category + '/' + str(i).zfill(6) + '.jpg'
            notedarray = get_embedding(secondmodel, img).tolist()
            dataset['info'].append({
                    'no': i,
                    'category': category,
                    'name': name,
                    'url': url,
                    'imagelink': img,
                    'notedarray': notedarray
                    })
            print(i)
            print(imagelink)
            print(img)
        except Exception as e:
            print(e)
            fail.append(i)

# print(dataset)
with open(EMBEDDINGS, 'w') as f:
    json.dump(dataset, f)
with open(FAILEMBEDDINGS, 'w') as f:
    json.dump(fail, f)
print('Done')

    
