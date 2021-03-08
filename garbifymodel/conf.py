#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: conf.py
@time: 2021/2/21 18:38
@desc: Null
"""

DATASET_DIR = '../dataset'  # 训练数据集目录位置
PREDICT_DATA_DIR = '../predict'  # 预测数据集目录位置，目前训练不用管
TEST_DIR = '../test'  # 测试集的，没写，不管
CHECKPOINTS_PATH = './ckpt/cp.ckpt'  # 检查点保存的，也不用改
SAVED_MODEL_PATH = 'garbify_model'  # 模型名字
TARGET_IMAGE_SIZE = (299, 299)  # 输入的张量的维度，不管，和xception网络有关
CLASSES = 40  # 分类个数，数据集标注就是40类，所以40
BATCH_SIZE = 32  # 批大小，这个看电脑性能，显卡内存大就可以弄大点，
# 但也别太小，太小一是训练太慢，二是xception网络里的BatchNormalization层效果会变差
VALID_RATIO = 0.2  # 从数据集中抽出多少占比做验证集，二八原则
EPOCHS = 25  # 训练迭代几次，我训练的时候大概是17.18次就够了，25应该是过拟合了
RETRAIN = False  # 重训练，不管，还没写呢

