#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: base64_wrapper.py
@time: 2021/2/24 22:33
@desc: Null
"""
import tensorflow as tf
import conf

model = tf.keras.models.load_model(conf.SAVED_MODEL_PATH)


@tf.function(input_signature=[tf.TensorSpec(shape=(None,), dtype=tf.string)])
def serving(input_image):
    def _input_to_feature(base64_str):
        img_tensor = tf.io.decode_base64(base64_str)
        img_tensor = tf.image.decode_jpeg(img_tensor, channels=3)
        img_tensor = tf.image.convert_image_dtype(img_tensor, tf.float32)
        img_tensor = tf.image.resize(img_tensor, conf.TARGET_IMAGE_SIZE)
        return img_tensor

    with tf.device('/cpu:0'):
        img = tf.map_fn(_input_to_feature, input_image, dtype=tf.float32)
        predict = model(img)

    return predict


tf.saved_model.save(model, export_dir=conf.SAVED_MODEL_PATH + '/wrapper', signatures=serving)
