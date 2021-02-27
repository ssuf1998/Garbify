#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: conf.py
@time: 2021/2/21 18:38
@desc: Null
"""

DATASET_DIR = '../dataset'
PREDICT_DATA_DIR = '../predict'
TEST_DIR = '../test'
CHECKPOINTS_PATH = './ckpt/cp.ckpt'
SAVED_MODEL_PATH = 'garbify_model'
TARGET_IMAGE_SIZE = (299, 299)
CLASSES = 40
BATCH_SIZE = 32
VALID_RATIO = 0.2
EPOCHS = 25
RETRAIN = False
