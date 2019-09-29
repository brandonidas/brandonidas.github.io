// GLOBAL VARIABLES
// const model = tf.sequential();
model = tf.sequential();

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

// y = mx + 0, predict m
// r is random variance along y axis
// n is number of data points
// a is the gradent
function createData(m = 1, r = 2.3, n = 10) {
    a = (1 + Math.round(Math.random() * 10) / 2) * ((Math.random() > 0.5) ? -1 : 1); // [-6,6]
    document.getElementById("gradient").innerText = "gradient: " + a;
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
}

function addData(dataXYArray, color = "red") {
    dataset = {
        type: 'line',
        fill: true,
        borderWidth: 2,
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

    // xArray = xySampleArray.map(e => e.x);
    // yArray = xySampleArray.map(e => e.y);

    // document.getElementById("xV").innerText = "sample x: " + xArray;
    // document.getElementById("yV").innerText = "sample y: " + yArray;

    // const xs = tf.tensor2d(xArray, [xArray.length, 1])
    // const ys = tf.tensor2d(yArray, [yArray.length, 1])
    // await model.fit(xs, ys, { epochs: 1 });
}

// new function to demonstrate fitting process
async function refit(n = 1) {
    await model.fit(xs, ys, { epochs: n });
}

async function refitOnceAndPredict() {
    await model.fit(xs, ys, { epochs: 1 });
    addData(linearPredict(), "blue")
}

async function refitHundredAndPredict() {
    await model.fit(xs, ys, { epochs: 100 });
    addData(linearPredict(), "red")
}

function linearPredict() {
    inputXArray = Array.from(Array(xySampleArray.length).keys())
    prediction = model.predict(tf.tensor2d(inputXArray, [inputXArray.length, 1]));
    predictionVal = (prediction.dataSync());
    // document.getElementById("demo").innerText = "predicted-y: " + predictionVal;
    predictedData = Array(inputXArray.length);
    for (let index = 0; index < predictedData.length; index++) {
        predictedData[index] = {
            x: inputXArray[index],
            y: predictionVal[index]
        }
    }
    console.log(predictedData);
    document.getElementById("predictedGradient").innerText = "predicted: "
        + ((predictedData[9].y - predictedData[0].y) / 10);
    return predictedData;
}
linearTrain();