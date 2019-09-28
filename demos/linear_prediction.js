console.log('Hello TensorFlow');
// y = mx + 0, predict m
// r is random variance along y axis of data
// n is number of data points
function createData(m = 1, r = 2, n = 10) {
    xyObjectArray = [];
    for (i = 0; i < n; i++) {
        yEntropy = r*((Math.random() > 0.5) ? - Math.random() : Math.random())
        var xy = {
            x: i,
            y: i + yEntropy
        }
        console.log("y value added:" + yEntropy)
        xyObjectArray.push(xy);
    }
    return xyObjectArray;
}
xyObjectArray = createData();

var ctx = document.getElementById('myChart1').getContext('2d');
var scatterChart = new Chart(ctx, {
    type: 'scatter',
    label: xyObjectArray.map(e => e.x),
    data: {
        datasets: [{
            type: 'scatter',
            borderColor: 'rgba(54, 162, 235, 0.9)',
            backgroundColor: 'rgba(54, 162, 235, 0.9)',
            label: 'Sample Linear Data',
            data: xyObjectArray
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
        data: dataXYArray
    }
    scatterChart.data.datasets.push(dataset);
    // scatterChart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(data);
    // });
    scatterChart.update();
}
// async function learnLinear(){
//     const model = tf.sequential
// }
async function linearPredict() {
    console.log("linearPredict")
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    xArray = xyObjectArray.map(e => e.x);
    document.getElementById("xV").innerText = xArray;
    yArray = xyObjectArray.map(e => Math.round(e.y * 100) / 100);
    document.getElementById("yV").innerText = yArray;

    const xs = tf.tensor2d(xArray, [xArray.length, 1])
    const ys = tf.tensor2d(yArray, [yArray.length, 1])
    await model.fit(xs, ys, { epochs: 100 });

    prediction = model.predict(tf.tensor2d(xArray, [xArray.length, 1]));
    x = document.getElementById("demo");
    x.innerText = prediction;
    predictionVal = (prediction.dataSync());
    console.log(predictionVal)
    predictedData = Array(xyObjectArray.length);
    for (let index = 0; index < predictedData.length; index++) {
        predictedData[index] = {
            x: xArray[index],
            y: predictionVal[index]
        }
    }
    console.log(predictedData);
    addData(predictedData)

}
linearPredict()