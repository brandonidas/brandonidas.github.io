var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');


// stacked data
var barChartData = {
  labels: ['2018 Winter 1', '2018 Winter 2', '2019 Summer 1', '2019 Summer 2'],
  datasets: [{
    label: 'Lab',
    backgroundColor: 'rgba(255, 206, 86, 0.5)',
    stack: 'Stack 0',
    data: [
      25,75,25,25
    ]
  }, {
    label: 'Lecture',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    stack: 'Stack 0',
    data: [
      0,0,125,125
    ]
  }, {
    label: 'Project Guidance',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    stack: 'Stack 0',
    data: [
      0,0,0,8
    ]
  }]

};
// stacked
var stackedChart = new Chart(ctx1, {
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
var radarChart = new Chart(ctx2, {
    type: 'radar',
    data: {
    datasets: [{
      // Self-reported OCEAN
        label : "Self-reported OCEAN",
        data: [9, 9, 8,5,6],
        pointBackgroundColor: "red",
        borderColor: "red",
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },{

      label : "Correlated with CS Proficiency",
      data: [10, 10,5,0,0],
      pointBackgroundColor: "blue",
      borderColor: "blue",
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Openness',
        'Consciousness',
        'Extraversion',
        'Agreeableness',
        'Neuroticism',
    ]},
    //options: options
});

// Struggle, fulfilment and personal growth
var fulfilmentConfig = {
			type: 'bar',
			data: {
				labels: [ "Pre-Army","Recruit","Medical Corps", "UBC Freshmen"],
				datasets: [{
					type: 'bar',
					label: 'Negative Emotion',
					backgroundColor: 'rgba(255, 99, 132, 0.7)',
					borderColor: 'rgba(255, 99, 132, 1)',
					data: [3,3,2.5,2],
				}, {
					type: 'bar',
					label: 'Socio-Intellectual Growth',
					backgroundColor: 'rgba(54, 162, 235, 0.7)',
					borderColor: 'rgba(54, 162, 235, 1)',
					data: [1,1,3,3],
				},{
					type: 'line',
					label: 'Self-Respect/Actualisation',
					backgroundColor: 'orange',
					borderColor: 'orange',
					fill: true,
					data: [1.5,0,3,2.5],
				}]
			},
			options: {
				title: {
					text: 'Personal Growth Chart'
				}
			}
		};
var fulfillment = new Chart(ctx3, fulfilmentConfig);

function random(min, max) {
  return (Math.random() * (+max - +min) + +min);
}
