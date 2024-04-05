import numpy as np # linear algebra
import matplotlib.pyplot as plt # to show images
import numpy as np
from PIL import Image 
import cv2

def bbox1(box, image):
    imgheight, imgwidth, imgchannels = image.shape
    print(image.shape)
    xcenter = ((box[0] * 2 + box[2]) / 2) / imgwidth
    ycenter = ((box[1] * 2 + box[3]) / 2) / imgheight
    width = box[2] / imgwidth
    height = box[3] / imgheight
    return (xcenter, ycenter, width, height)

def bbox(box, image):
    imgheight, imgwidth = image.size
    print(image.size)
    xcenter = ((box[0] + box[2]) / 2) / imgwidth
    ycenter = ((box[1] + box[3]) / 2) / imgheight
    width = box[2] / imgwidth
    height = box[3] / imgheight
    return (box[0], box[1], box[0] + box[2], box[1] + box[3])
    # return (xcenter, ycenter, width, height)

plt.figure(figsize=(10,10))
im= Image.open('E:/clothing_online_store/dataset/Fashionpedia/validation/image/ff6884bdb45a9aca6df20885e950eb1f.jpg')
image1 = cv2.imread('E:/clothing_online_store/dataset/Fashionpedia/validation/image/ff6884bdb45a9aca6df20885e950eb1f.jpg')
box = [113.0, 279.0, 487.0, 574.0]
b_box = bbox(box, im)
b_box1 = bbox1(box, image1)
print(b_box1)
print(b_box)
im=im.crop(b_box)

plt.subplot(3,3,1)
plt.axis("off")
plt.imshow(im) 
plt.show()