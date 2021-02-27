#!/usr/bin/env python
# encoding: utf-8
"""
@author: ssuf1998
@file: train.py
@time: 2021/2/21 18:59
@desc: Null
"""
import tensorflow as tf

gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)

import pre
import conf
import model
import pickle
import datetime

valid_count = int(pre.image_count * conf.VALID_RATIO)
train_count = pre.image_count - valid_count

train_dataset = pre.dataset.skip(valid_count)
valid_dataset = pre.dataset.take(valid_count)

train_dataset = train_dataset.repeat().shuffle(buffer_size=train_count).batch(conf.BATCH_SIZE)
valid_dataset = valid_dataset.batch(conf.BATCH_SIZE)

train_steps = train_count // conf.BATCH_SIZE
valid_steps = valid_count // conf.BATCH_SIZE

save_model_cb = tf.keras.callbacks.ModelCheckpoint(
    conf.CHECKPOINTS_PATH, save_weights_only=True,
    verbose=0, save_freq='epoch'
)


class HistoryCallback(tf.keras.callbacks.History):
    def on_epoch_end(self, epoch, logs=None):
        super(HistoryCallback, self).on_epoch_end(epoch, logs)
        with open('history.pkl', mode='wb') as fp:
            pickle.dump(self.history, fp)


log_dir = 'logs/' + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
tensorboard_cb = tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1)

# early_stop_cb = tf.keras.callbacks.EarlyStopping(
#     monitor='val_acc', mode='max', patience=3, min_delta=0.001
# )

m = model.xception(conf.CLASSES)
if conf.RETRAIN:
    m.load_weights(conf.CHECKPOINTS_PATH)
m.fit(
    train_dataset,
    epochs=conf.EPOCHS,
    steps_per_epoch=train_steps,
    validation_data=valid_dataset,
    validation_steps=valid_steps,
    callbacks=[
        save_model_cb,
        HistoryCallback(),
        tensorboard_cb
    ]
)

m.save(conf.SAVED_MODEL_PATH)

