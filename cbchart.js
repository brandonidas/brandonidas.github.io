var ctx1 = document.getElementById('CBChart1').getContext('2d');
var fulfillment = new Chart(ctx1, stackedChart);

// stacked data
// data from https://www.moh.gov.sg/covid-19/situation-report
var barChartData = {
  labels: ['1/4', '2/4','3/4','4/4','5/4','6/4','7/4','8/4','9/4','10/4',
  '11/4','12/4','13/4','14/4','15/4','16/4'],
  datasets: [{
    label: 'Singaporean',
    backgroundColor: 'rgba(255, 206, 86, 0.5)',
    stack: 'Stack 0',
    data: [
      25,75,25,25
    ]
  }, {
    label: 'Work-Pass Holders',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    stack: 'Stack 0',
    data: [
      0,0,125,125
    ]
  }, {
    label: 'Imported',
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
  						text: "UBC Computer Science Students TA'd"
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
