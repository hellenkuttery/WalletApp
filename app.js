// https://www.chartjs.org/docs/latest/charts/doughnut.html

const kira=1000
const gida=500
const giyim=300
const fatura=100
const kirtasiye=100
const diger=200
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Blue', 'Red', 'Orange', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: [kira, giyim, gida, fatura, kirtasiye, diger],
      data: [kira, giyim, gida, fatura, kirtasiye, diger],
      borderWidth: 1,
      hoverBorderJoinStyle:"miter",
      borderAlign:"center"
    }]
  },

//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
});