console.log('Hello TensorFlow');

// y = mx + 0, predict m
// r is random variance along y axis
// n is number of data points
function createData(m = 1, r = 2.3, n = 10) {
    ret = [];
    for (i = 0; i < n; i++) {
        yEntropy = r*((Math.random() > 0.5) ? - Math.random() : Math.random())
        var xy = {
            x: i,
            y: Math.round((i + yEntropy) * 100) / 100
        }
        console.log("y value added:" + yEntropy)
        ret.push(xy);
    }
    return ret;
}
xyObjectArray = createData();

function newData(){
    xyObjectArray = createData();
    while(scatterChart.data.datasets.length > 1) {
        scatterChart.data.datasets.pop();
    }
    scatterChart.data.datasets[0].data = xyObjectArray;
    linearTrain();
    scatterChart.update();
}

var ctx = document.getElementById('myChart1').getContext('2d');
var scatterChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            borderColor: 'rgba(54, 162, 235, 0.9)',
            backgroundColor: 'rgba(54, 162, 235, 0.9)',
            label: 'Sample Linear Data',
            data: xyObjectArray,
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
function addData(dataXYArray) {
    dataset = {
        type: 'line',
        fill: true,
        borderWidth: 2,
        borderColor: "red",
        backgroundColor: "red",
        label: 'Predicted Data',
        data: dataXYArray,
        pointRadius: 1,
        fill:false,
    }
    scatterChart.data.datasets.push(dataset);
    scatterChart.update();
}
const model = tf.sequential();
async function linearTrain() {
    console.log("linearPredict")
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    xArray = xyObjectArray.map(e => e.x);
    yArray = xyObjectArray.map(e => e.y);

    document.getElementById("xV").innerText = "sample x: " + xArray;
    document.getElementById("yV").innerText = "sample y: " + yArray;

    const xs = tf.tensor2d(xArray, [xArray.length, 1])
    const ys = tf.tensor2d(yArray, [yArray.length, 1])
    await model.fit(xs, ys, { epochs: 100 });
}

function linearPredict(){
    // PREDICTION PHASE
    inputXArray = Array.from(Array(xyObjectArray.length).keys())
    console.log("inputXarray = "+ inputXArray)

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
    addData(predictedData)

}
linearTrain()