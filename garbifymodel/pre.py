#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: pre.py
@time: 2021/2/21 18:38
@desc: Null
"""

import conf
import pathlib

from random import shuffle
import tensorflow as tf

dataset_dir = pathlib.Path(conf.DATASET_DIR).absolute()
dataset_path = dataset_dir.joinpath('train_data')

all_image_str_path = [str(_) for _ in dataset_path.glob('*.jpg')]
shuffle(all_image_str_path)
image_count = len(all_image_str_path)

all_label_str_path = [_.replace('.jpg', '.txt') for _ in all_image_str_path]
all_image_label = []
for p in all_label_str_path:
    with open(p) as fp:
        all_image_label.append(int(fp.read().split(',')[1].strip()))


def preprocess_image(image_path, image_label):
    img_raw = tf.io.read_file(image_path)
    img_tensor = tf.image.decode_jpeg(img_raw, channels=3)
    img_tensor = tf.image.resize(img_tensor, conf.TARGET_IMAGE_SIZE)
    img_tensor = tf.cast(img_tensor, tf.float32)
    img = img_tensor / 255

    label = tf.reshape(image_label, [1])
    return img, label


dataset = tf.data.Dataset.from_tensor_slices((all_image_str_path, all_image_label))
dataset = dataset.map(preprocess_image)
