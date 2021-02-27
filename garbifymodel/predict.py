#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: predict.py
@time: 2021/2/22 14:52
@desc: Null
"""
import json
import pathlib

import numpy as np
from PIL import Image
from tensorflow import keras

import conf
import pprint


def get_declare_label():
    dataset_dir = pathlib.Path(conf.DATASET_DIR).absolute()
    with open(
            dataset_dir.joinpath('garbage_classify_rule.json').absolute(),
            encoding='utf-8'
    ) as fp:
        ret = json.load(fp)

    for k, v in ret.items():
        arr = v.split('/')
        ret[k] = {'type': arr[0], 'name': arr[1]}
    return ret


def load_image(image_path):
    ret = Image.open(image_path).convert('RGB').resize(conf.TARGET_IMAGE_SIZE)
    ret = np.reshape(ret, (conf.TARGET_IMAGE_SIZE[0], conf.TARGET_IMAGE_SIZE[1], 3)) / 255.0
    return np.array([1 - ret])


def predict(images_path: list):
    declare_label = get_declare_label()
    model = keras.models.load_model(conf.SAVED_MODEL_PATH)

    images = []
    for p in images_path:
        images.append(load_image(p))

    ys = model.predict(np.vstack(images))
    ret = []
    for i, y in enumerate(ys):
        three_biggest_val = sorted(y[sorted(np.argsort(y)[-3:])], reverse=True)

        predict_res = []
        for val in three_biggest_val:
            idx = int(np.where(y == val)[0])
            predict_res.append(dict({'idx': idx, 'conf': val}, **declare_label[str(idx)]))

        ret.append({
            'img': images_path[i],
            'predict': predict_res
        })

    return ret


if __name__ == '__main__':
    predict_path = pathlib.Path('predict').absolute()
    pprint.pprint(predict(
        [str(_) for _ in predict_path.glob('*.jpg')]
    ))
