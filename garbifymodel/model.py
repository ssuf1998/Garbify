#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: model.py
@time: 2021/2/21 18:26
@desc: Null
"""

import tensorflow as tf


def xception(classes):
    base = tf.keras.applications.Xception(
        input_shape=(299, 299, 3),
        weights='xception_weights_tf_dim_ordering_tf_kernels_notop.h5',
        include_top=False,
        pooling='avg'
    )
    base.trainable = False
    m = tf.keras.Sequential()
    m.add(base)

    # lr_fn = tf.keras.optimizers.schedules.ExponentialDecay(
    #     initial_learning_rate=0.01,
    #     decay_steps=256,
    #     decay_rate=0.96
    # )
    # opt = tf.keras.optimizers.Adam(learning_rate=0.001 if conf.RETRAIN else lr_fn)

    m.add(tf.keras.layers.Dense(classes, activation='softmax'))
    opt = tf.keras.optimizers.Adam()
    m.compile(optimizer=opt,
              loss='sparse_categorical_crossentropy',
              metrics=['acc'])

    return m
