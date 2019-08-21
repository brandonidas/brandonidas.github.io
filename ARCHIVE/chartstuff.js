var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');
var ctx4 = document.getElementById('myChart4').getContext('2d');


// stacked data
var barChartData = {
  labels: ['2018 Winter 1', '2018 Winter 2', '2019 Summer 1', '2019 Summer 2'],
  datasets: [{
    label: 'Lab',
    backgroundColor: 'rgba(255, 206, 86, 0.2)',
    stack: 'Stack 0',
    data: [
      25,75,25,25
    ]
  }, {
    label: 'Lecture',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    stack: 'Stack 0',
    data: [
      0,0,125,125
    ]
  }, {
    label: 'Project Guidance',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    stack: 'Stack 0',
    data: [
      0,0,0,8
    ]
  }]

};
// stacked
var stackedChart = new Chart(ctx4, {
  				type: 'bar',
  				data: barChartData,
  				options: {
  					title: {
  						display: true,
  						text: "CS Students TA'd"
  					},
  					tooltips: {
  						mode: 'index',
  						intersect: false
  					},
  					responsive: true,
  					scales: {
  						xAxes: [{
  							stacked: true,
  						}],
  						yAxes: [{
  							stacked: true
  						}]
  					}
  				}
  			});

        // time spent learning chart.js
        // TODO change to polar area with difficulty scale
        var myDoughnutChart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Red',
                'Yellow',
                'Blue'
            ]},
            //options: options
        });
// // TODO: mix chart type with regression line
// // TODO: figure out something to chart that's serious and relavant
// var scatterChart = new Chart(ctx3, {
//     type: 'scatter',
//     data: {
//         datasets: [{
//             label: 'Scatter Dataset',
//             data: [ {x: -10,y: 0},
//                     {x: 0,  y: 10},
//                     {x: 10,  y: 5},
//                     {x: 10,  y: 5},
//                     {x: 7,  y: 2},
//                     {x: 8,  y: 3},
//                     {x: 5,  y: 4},
//                     {x: 6,  y: 9}]}]
//                   },
//     options: {
//         scales: {
//             xAxes: [{
//                 type: 'linear',
//                 position: 'bottom'
//             }]
//         }
//     }
// });

// students taught 110 winter term 1,2,summer,210 summer
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Lab: 110 Winter Term 1', 'Lab: 110 Winter Term 2', 'Lecture: 110 Summer Term 1',
                  'Lab: 110 Summer Term 1', 'Lecture: 210 Summer Term 2',
                  'Project Guidance: 210 Summer Term 2', 'Orange'],
        datasets: [{
            label: 'Approx. Students Taught in UBC Computer Science by term, course and role',
            data: [25, 75, 120, 25, 120, 8],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
