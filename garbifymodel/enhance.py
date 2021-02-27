#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: enhance.py
@time: 2021/2/23 21:50
@desc: Null
"""
import pathlib
import random
import shutil

from PIL import Image

import conf


def enhance():
    dataset_dir = pathlib.Path(conf.DATASET_DIR).absolute()
    dataset_path = dataset_dir.joinpath('train_data')

    all_image_str_path = [str(_) for _ in dataset_path.glob('*.jpg')]

    for i, p in enumerate(all_image_str_path):
        print('\renhancing... {}%'.format(round(i / (len(all_image_str_path) - 1) * 100, 1)), end='')
        method_num = random.random()
        rotate_num = random.randint(0, 2)
        crop_num = random.randint(0, 3)
        abs_stem = dataset_path.joinpath(pathlib.Path(p).stem).absolute().__str__()

        img = Image.open(p).convert('RGB')
        if method_num <= 0.5:  # 旋转
            img = img.transpose((2, 3, 4)[rotate_num])
        else:
            ratio = img.height / img.width
            crop_size = (int(img.width * 0.8), int(img.width * 0.8 * ratio))
            # 0是左上，1是左下，2是右上，3是右下
            x0 = 0 if crop_num in (0, 1) else img.width - crop_size[0]
            y0 = 0 if crop_num in (0, 2) else img.height - crop_size[1]
            x1 = x0 + crop_size[0]
            y1 = y0 + crop_size[1]
            img = img.crop((x0, y0, x1, y1))

        img.save(abs_stem + '_enhanced.jpg')
        shutil.copyfile(abs_stem + '.txt', abs_stem + '_enhanced.txt')


if __name__ == '__main__':
    enhance()
