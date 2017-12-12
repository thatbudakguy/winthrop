// Color palettes using the colors assigned by the Sankey diagram
let annoPalette = [
  '#C581D1',
  '#33BCCD',
  '#51C6D4',
  '#FF8C68',
  '#6BCFDB',
]
let subPalette = [
  '#F7CB51',
  '#E67F77',
  '#F8D36B',
  '#E9928B',
  '#73C69E',
]
let tagsPalette = [
  '#F6A3BF',
  '#FFAB92',
  '#51A39A',
  '#F493B4',
  '#7C88CC',
]

// draw functions for each of the horizontal bar charts
new Chart($('#top5anno'), {
  type: 'horizontalBar',
  data: {
    labels: ['Adam Winthrop',
    'Forth Winthrop',
    'John Winthrop, FRS',
    'Wait Winthrop',
    'John Winthrop, Jr.'],
    datasets: [{
      label: 'annotations',
      data: [68, 7, 3, 2, 1],
      backgroundColor: annoPalette,
    }],
  },
  options: {
    legend: {
      display: false,
    },
  },
})

new Chart($('#top5sub'), {
  type: 'horizontalBar',
  data: {
    labels: ['Historia',
    'Chronology',
    'Law',
    'Commentary',
    'Religion'],
    datasets: [{
      label: 'annotations',
      data: [28, 15, 13, 10, 8],
      backgroundColor: subPalette,
    }],
  },
  options: {
    legend: {
      display: false,
    },
  },
})

new Chart($('#top5tags'), {
  type: 'horizontalBar',
  data: {
    labels: ['textual annotation',
    'dash',
    'underlining',
    'signature',
    'manicule'],
    datasets: [{
      label: 'annotations',
      data: [67, 57, 27, 20, 18],
      backgroundColor: tagsPalette,
    }],
  },
  options: {
    legend: {
      display: false,
    },
  },
})
