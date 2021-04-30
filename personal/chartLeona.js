var ctx1 = document.getElementById('personality-chart').getContext('2d');


// time spent learning chart.js
// TODO change to polar area with difficulty scale
var radarChart = new Chart(ctx1, {
    type: 'radar',
    data: {
    datasets: [{
      // Self-reported OCEAN
        label : "Combined Peer and Self Reported HEXACO",
        data: [8,7,9,3,7,9],
        pointBackgroundColor: "red",
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
    },{

      label : "Projected Partner Type",
      data: [8,2,7,7,7,9],
      pointBackgroundColor: "blue",
      backgroundColor: 'rgba(54, 162, 235, 0.2)'
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Honesty-Humility',
        'Emotional Reactivity',
        'Extraversion',
        'Agreeableness',
        'Consciousness',
        'Openness'
    ]},
    options: {
      responsive: true,
      title: {
        display: true,
        text: "My Personality"
      }
    }
});
