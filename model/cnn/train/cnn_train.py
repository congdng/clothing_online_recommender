import tensorflow as tf
import os
from keras.applications.resnet import ResNet50, preprocess_input
import keras
from keras.layers import Conv2D,Dense, MaxPooling2D,Dropout,Flatten, Activation, BatchNormalization,LeakyReLU, GlobalMaxPooling2D
from keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
from keras.optimizers import adam_v2
import numpy as np
from keras import callbacks
import warnings
warnings.filterwarnings('ignore')

def build_model(vgg, num_classes, drop_rate, learning_rate):
    model = keras.models.Sequential()
    model.add(vgg)
    model.add(GlobalMaxPooling2D())
    # model.add(Flatten())
    model.add(Dense(1024, activation='relu'))
    model.add(BatchNormalization())
    model.add(Dropout(drop_rate))
    model.add(Dense(num_classes, activation='softmax'))


    opt = adam_v2.Adam(learning_rate = learning_rate)
    model.compile(loss = 'categorical_crossentropy', optimizer = opt , metrics=[tf.keras.metrics.CategoricalAccuracy()])
    return model

def data_aug(train_path, batch_size, batch_size_valid, shift_fraction, image_size):
    traingene = ImageDataGenerator(
    rotation_range=20,
    height_shift_range=shift_fraction,
    width_shift_range=shift_fraction,
    shear_range=shift_fraction,
    zoom_range=shift_fraction,
    horizontal_flip=True,
    brightness_range=[0.5, 1.5],
    validation_split=0.22,
    preprocessing_function=preprocess_input
    )
    # validgene = ImageDataGenerator(preprocessing_function=preprocess_input)

    class_subset = sorted(os.listdir(TRAINSAVEFOLDER))
    train_set = traingene.flow_from_directory(
            train_path,
            target_size = image_size,
            batch_size = batch_size,
            class_mode = 'categorical',
            classes = class_subset,
            subset='training',
            shuffle = True,
            seed = 42)
    valid_set = traingene.flow_from_directory(
            train_path,
            target_size = image_size,
            batch_size = batch_size_valid,
            class_mode='categorical',
            classes = class_subset,
            subset='validation',
            shuffle=True,
            seed=42)
    return train_set, valid_set

def fit_model(model, train_set, validation_set, epochs, checkpointfile):
    mc = callbacks.ModelCheckpoint(checkpointfile, monitor = 'val_loss', mode = 'min', save_best_only = True)
    es = callbacks.EarlyStopping(monitor = 'val_loss', verbose = 1,
                                        mode = "min", patience = 20,
                                        restore_best_weights = True)
    history = model.fit(
        train_set, 
        epochs = epochs,
        validation_data = validation_set,
        verbose = 1,
        callbacks=[mc,es])
    return model, history

def draw_result(model_history):
    accuracy = model_history.history['categorical_accuracy']
    val_accuracy = model_history.history['val_categorical_accuracy']

    loss = model_history.history['loss']
    val_loss = model_history.history['val_loss']

    plt.figure(figsize=(8, 8))
    plt.subplot(2, 1, 1)
    plt.plot(accuracy, label='Training Accuracy')
    plt.plot(val_accuracy, label='Validation Accuracy')
    plt.legend(loc='lower right')
    plt.ylabel('Accuracy')
    plt.ylim([min(plt.ylim()),1])
    plt.title('Training and Validation Accuracy')
    plt.savefig('./Accuracy.jpg')

    plt.subplot(2, 1, 2)
    plt.plot(loss, label='Training Loss')
    plt.plot(val_loss, label='Validation Loss')
    plt.legend(loc='upper right')
    plt.ylabel('Cross Entropy')
    plt.ylim([0,max(plt.ylim())])
    plt.title('Training and Validation Loss')
    plt.savefig('./Loss.jpg')
    plt.show()


lr = 0.00027440977 #2nd
# lr = 0.0003630778 #tune
# lr = 0.0001
wd = 1e-3 * lr
TRAINNO = 312184
VALIDNO = 52489
TRAINFOLDER = 'E:/Project/train/image/'
VALIDFOLDER = 'E:/Project/validation/image/'
TRAINJSONPATH = 'finalsum.json'
VALIDJSONPATH = 'finalvalidsum.json'
TRAINSAVEFOLDER = 'traindata/'
TESTSAVEFOLDER = 'testdata/'
FAST_RUN = False
IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224
IMAGE_CHANNELS = 3
image_size = (IMAGE_WIDTH, IMAGE_HEIGHT)
batch_size = 32
batch_size_valid = 16
epochs = 10 if FAST_RUN else 200
num_classes = 6
drop_rate = 0.4
shift_fraction = 0.2
checkpointfile = 'GoodFinalModel3.h5'

mobb = ResNet50(weights = 'imagenet', 
    include_top = False,       
    input_shape = (IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS))

for layer in mobb.layers[:-4]:
    layer.trainable = False

# Warm up
for layer in mobb.layers:
    print(layer, layer.trainable)
print(mobb.summary())

model = build_model(mobb, num_classes, drop_rate, lr)
print(model.summary())
# plot_model(model, 'model_summary.jpg')

train_set, valid_set = data_aug(TRAINSAVEFOLDER, batch_size, batch_size_valid, shift_fraction, image_size)
# print(train_set, valid_set)

model, history = fit_model(model, train_set, valid_set, epochs, checkpointfile)
draw_result(history)

model.save('FinalModel3')
model.save_weights('FinalModel3_weights.h5')