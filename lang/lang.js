/* eslint-disable max-len */

let palette1 = [
  '#ff6384',
  '#ffce56',
  '#36a2eb',
  '#4f7942',
]

let palette2 = [
    '#2E2D4D',
    '#337357',
    '#6D9F71',
    '#E4E3D3',
]

let colorMap = palette1

let languagesChart = new Chart($('#winthrop'), {
  type: 'pie',
  data: {
    labels: ['English', 'Latin', 'Greek', 'Symbol'],
    datasets: [{
        label: 'Princeps (selections)',
        data: [0, 3, 0, 48],
        backgroundColor: colorMap,
      },
      {
        label: 'The Triall of Witch-craft, shewing the True and Right Methode of the Discovery, with A Confutation of erroneous wayes',
        data: [14, 8, 0, 18],
        backgroundColor: colorMap,
      },
      {
        label: 'Chronologia sacra (selections)',
        data: [0, 1, 0, 18],
        backgroundColor: colorMap,
      },
      {
        label: '[...] Flores: ex operibus [...] singulari iudicio selecti',
        data: [4, 3, 1, 9],
        backgroundColor: colorMap,
      },
      {
        label: 'De republica Anglorum. The maner of Governement or policie of the Realme of England',
        data: [9, 4, 0, 3],
        backgroundColor: colorMap,
      },
    ],
  },
  options: {
    legend: {
      display: true,
    },
  },
})

let booksList = languagesChart.data.datasets.map((ds) => {
    return `<li class="list-group-item"><i>${ds.label}</i></li>`
}).join('')

$('.books-list').html(booksList)

$('.non-na').click((e) => {
  languagesChart.data.datasets = languagesChart.data.datasets.map((ds) => {
    return {
      label: ds.label,
      data: ds.data.slice(0, 3),
      backgroundColor: ds.backgroundColor,
    }
  })
  languagesChart.update()
})
