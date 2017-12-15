/* eslint-disable max-len */

// Color palettes
let palettes = {
    a: [
      '#2E2D4D',
      '#337357',
      '#6D9F71',
      '#E4E3D3',
    ],
    b: [
      '#ff6384',
      '#ffce56',
      '#36a2eb',
      '#4f7942',
    ],
}

// Create initial pie chart
let pieChart = new Chart($('#winthrop'), {
    type: 'pie',
    data: {
        labels: [
            'English',
            'Latin',
            'Greek',
            'Symbol',
        ],
        datasets: []
    },
    options: {
        legend: {
            display: true
        }
    }
})

// Create initial bar chart
let barChart = new Chart($('#bars'), {
    type: 'horizontalBar',
    data: {
        labels: [],
        datasets: [{
            label: 'annotations',
            data: [],
            backgroundColor: palettes.b
        }]
    }
})

// Load language data and transform into Observable
let dataStream = Rx.Observable
    .fromPromise($.getJSON('languages.json')) // async load json
    .flatMap(Rx.Observable.from) // convert flat array into sequence
    .map((book) => {
        return {
            label: book.label,
            data: book.data,
            backgroundColor: palettes.a // add color to each book dataset
        }
    })
    .toArray() // flatten sequence back into array
    .map((books) => {
        return books.sort((a, b) => { // sort book datasets by total annotation count
            return b.data.reduce((acc, cur) => acc + cur) - a.data.reduce((acc, cur) => acc + cur)
        })
    })
    .flatMap(Rx.Observable.from) // convert array back into sequence
    .take(5) // limit to top 5 books by annotation count
    .toArray() // flatten sequence into array again

// Take the first version of the data and load into the chart
// dataStream.first().subscribe((datasets) => {
//     datasets.map((book) => pieChart.data.datasets.push(book))
//     pieChart.update()
// })

// Capture button clicks as Observable
let buttonStream = Rx.Observable.fromEvent($('.symbol-vis'), 'click')

// Use button clicks to alter language data
let combinedStream = Rx.Observable
    .combineLatest(dataStream, buttonStream, (datasets) => {
        if ($('.symbol-vis').hasClass('show')) { // check if we turned off symbols
            return datasets.map((book) => {
                return {
                    label: book.label,
                    data: book.data.slice(0, 3), // remove the symbol data from each book's dataset
                    backgroundColor: palettes.a
                }
            })
        }
        else {
            return datasets // pass along the data unchanged
        }
    })

// Create bar chart data from language data
let barStream = combinedStream
    .flatMap(Rx.Observable.from) // convert array into sequence
    .map((book) => {
        return {
            label: 'annotations',
            data: book.data.reduce((acc, cur) => acc + cur), // sum the annotations
            backgroundColor: palettes.b
        }
    })

// Update the bar chart with the bar chart data
barStream.subscribe((datasets) => {
    barChart.data.datasets[0].data.forEach((val) => val.pop())
    datasets.data.forEach((val) => barChart.data.datasets[0].data.push(val))
    barChart.update()
})

// Update the pie chart with the pie chart data
combinedStream.subscribe((datasets) => {
    if ($('.symbol-vis').hasClass('hide')) {
        pieChart.data.labels.push('Symbol')
    }
    else {
        pieChart.data.labels.pop()
    }
    pieChart.data.datasets.forEach((book) => book.data.pop())
    pieChart.data.datasets.forEach((book, i) => book.data.push(datasets[i].data))
    pieChart.update()
})

// Update the button's html when it is clicked
buttonStream.subscribe((e) => {
    $('.symbol-vis')
        .toggleClass('hide')
        .toggleClass('show')
        .text(() => {
            return $('.symbol-vis').text() === 'Hide symbols' ? 'Show symbols' : 'Hide symbols'
        })
})
