import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import trainData from './data/training-data';
import testData from './data/testing-data';

const col1 = 'sepal_length';
const col2 = 'sepal_width';
const col3 = 'petal_length';
const col4 = 'petal_width';
const col5 = 'species';

const lbl1 = 'setosa';
const lbl2 = 'virginica';
const lbl3 = 'versicolor';

export function createTensorData(data) {
    return tf.tensor2d(data.map((item) => [
        item[col1], item[col2], item[col3], item[col4]
    ]));
}

export function createTensorLabel(data) {
    return tf.tensor2d(data.map((item) => [
        item[col5] === lbl1 ? 1 : 0,
        item[col5] === lbl2 ? 1 : 0,
        item[col5] === lbl3 ? 1 : 0
    ]));
}

//build model
const model = tf.sequential();

model.add(tf.layers.dense({
    inputShape: [4],
    activation: 'sigmoid',
    units: 5
}));

model.add(tf.layers.dense({
    inputShape: [5],
    activation: 'sigmoid',
    units: 3
}));

model.add(tf.layers.dense({
    activation: 'sigmoid',
    units: 3
}));

model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.adam(.06)
})

//create training data
const trainingData = createTensorData(trainData);
const output = createTensorLabel(trainData);

//train model
const trainModel = model.fit(trainingData, output, { epochs: 100 });

//predict
export function predict(input) {
    return new Promise((resolve, reject) => {
        trainModel.then(() => {
            model.predict(input).data().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        })
    })
}

//test accuracy
export function showAccuracy() {
    return new Promise((resolve, reject) => {
        const testingData = createTensorData(testData);
        predict(testingData).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
}
