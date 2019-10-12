// >>> APPROACH <<<
//      y = mx
// create random m on [-5,5]
// create x-array of ints from 0 to n
//      y = m(x + d), where d represents entropy
// create y-array from x-array with an random distortion within some d
// fold x-array and y-array into a an x-y object array for charting
// chart via chart.js

function generateData(n = 10) {
    xs = Array.from(Array(n).keys());
    ys = [];
    xys = [];
    m = Math.round((Math.random() * 10) / 2) * ((Math.random() > 0.5) ? -1 : 1); // [-5,5]
    d = Math.round((Math.random() * 10) / 5) * ((Math.random() > 0.5) ? -1 : 1); // [-2,2]
    for (let index = 0; index < n; index++) {
        ys[index] = m * (xs[index] + d * Math.random());
    }
    for (let index = 0; index < n; index++) {
        xys[index] = {
            x: xs[index],
            y: ys[index]
        }
    }
    return {
        xs: xs,
        ys: ys,
        xys: xys,
    }
}

// Model SetUp
function modelSetup(setUpObject) {
    model = tf.sequential();
    xs = tf.tensor2d(setUpObject.x, [setUpObject.x.length, 1])
    ys = tf.tensor2d(setUpObject.y, [setUpObject.y.length, 1])
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });
}



// GLOBAL VARIABLES
// const model = tf.sequential();
model = tf.sequential();

lineCounter = 0;
accuracyHistory = [];
gradient = 0;

// TODO: create second model for 100 epochs

var xySampleArray = createData();
xArray = xySampleArray.map(e => e.x);
yArray = xySampleArray.map(e => e.y);

document.getElementById("xV").innerText = "sample x: " + xArray;
document.getElementById("yV").innerText = "sample y: " + yArray;

xs = tf.tensor2d(xArray, [xArray.length, 1])
ys = tf.tensor2d(yArray, [yArray.length, 1])

var ctx = document.getElementById('myChart1').getContext('2d');
var scatterChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            borderDash: [5, 5],
            borderColor: 'rgba(54, 162, 235, 0.9)',
            backgroundColor: 'rgba(54, 162, 235, 0.9)',
            label: 'Sample Linear Data',
            data: xySampleArray,
            showLine: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

var ctx2 = document.getElementById('myChart2').getContext('2d');
var lineChart = new Chart(ctx2, {
    type: 'line',
    data: {
        datasets: [{
            borderDash: [5, 5],
            borderColor: 'rgba(54, 162, 235, 0.9)',
            backgroundColor: 'rgba(54, 162, 235, 0.9)',
            label: 'Accuracy over Epochs',
            data: accuracyHistory,
            showLine: true
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

// y = mx + 0, predict m
// r is random variance along y axis
// n is number of data points
// a is the gradent
function createData(m = 1, r = 2.3, n = 10) {
    a = (1 + Math.round(Math.random() * 10) / 2) * ((Math.random() > 0.5) ? -1 : 1); // [-6,6]
    document.getElementById("gradient").innerText = "gradient: " + a;
    gradient = a;
    ret = [];
    for (i = 0; i < n; i++) {
        yEntropy = r * ((Math.random() > 0.5) ? - Math.random() : Math.random())
        var xy = {
            x: i,
            y: a * Math.round((i + yEntropy) * 100) / 100
        }
        console.log("y value added:" + yEntropy)
        ret.push(xy);
    }
    return ret;
}

// Clear old data, generates new sample data, retrain model and update chart
function newData() {
    xySampleArray = createData();
    while (scatterChart.data.datasets.length > 1) {
        scatterChart.data.datasets.pop();
    }
    scatterChart.data.datasets[0].data = xySampleArray;
    model = tf.sequential();
    xArray = xySampleArray.map(e => e.x);
    yArray = xySampleArray.map(e => e.y);

    document.getElementById("xV").innerText = "sample x: " + xArray;
    document.getElementById("yV").innerText = "sample y: " + yArray;

    xs = tf.tensor2d(xArray, [xArray.length, 1])
    ys = tf.tensor2d(yArray, [yArray.length, 1])
    linearTrain();
    scatterChart.update();
    lineCounter = 0;
}

function addData(dataXYArray, color = "red") {
    dataset = {
        type: 'line',
        fill: true,
        borderWidth: 3,
        borderColor: color,
        backgroundColor: color,
        label: 'Predicted Data',
        data: dataXYArray,
        pointRadius: 1,
        fill: false,
    }
    scatterChart.data.datasets.push(dataset);
    scatterChart.update();
}

async function linearTrain() {
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });
}

// new function to demonstrate fitting process
async function refitOnceAndPredict() {
    await model.fit(xs, ys, { epochs: 1 });
    linearPredict('rgba(54, 162, 235,' + (0.1 + 0.1 * lineCounter) + ')', 'Predicted Data ' + (lineCounter + 1))
    lineCounter++
}

async function refitHundredAndPredict() {
    await model.fit(xs, ys, { epochs: 100 });
    linearPredict()
}

// TODO: add incremental opacity
function linearPredict(colour = "red", name = "Predicted Data") {
    inputXArray = Array.from(Array(xySampleArray.length).keys())
    prediction = model.predict(tf.tensor2d(inputXArray, [inputXArray.length, 1]));
    predictionVal = (prediction.data());
    predictionVal.then((message) => {
        // document.getElementById("demo").innerText = "predicted-y: " + predictionVal;
        predictedData = Array(inputXArray.length);
        for (let index = 0; index < predictedData.length; index++) {
            predictedData[index] = {
                x: inputXArray[index],
                y: message[index]
            }
        }
        console.log(predictedData);
        accuracy = Math.round(((predictedData[predictedData.length - 1].y - predictedData[0].y))) / predictedData.length;
        accuracyHistory.push(
            {
                x: (accuracyHistory.length + 1),
                y: accuracy/gradient
            });
        document.getElementById("predictedGradient").innerText = "predicted: " + accuracy;
        addData(predictedData, colour, name);
        lineChart.update();
    })
}
linearTrain();