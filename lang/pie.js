function updatePieChart(datasets) {
    clearPieChart()
    fillPieChart(datasets)
}

function fillPieChart(datasets) {
    datasets.forEach((book, i) => {
        book.data.forEach((language) => {
            pieChart.data.datasets[i].data.push(language)
        })
    })
    pieChart.update()
}

function clearPieChart() {
    // pieChart.data.labels.forEach((label) => label.pop())
    datasets.forEach((book, i) => {
        // console.log('deleting', book)
        book.data.forEach((language) => {
            pieChart.data.datasets[i].data.pop()
        })
    })
    pieChart.update()
}

function populatePieChart(datasets) {
    datasets.forEach((book) => pieChart.data.datasets.push(book))
    pieChart.update()
}

function toggleSymbolsButton() {
    let newText = symbolButton.text() === 'Hide symbols' ? 'Show symbols' : 'Hide symbols'
    symbolButton
        .toggleClass('hide')
        .toggleClass('show')
        .text(newText)
}

// Set color palette
let palette = [
  '#ff6384', // English
  '#ffce56', // Latin
  '#36a2eb', // Greek
  '#4f7942', // Symbol
]

// Handle for symbol toggle button
let symbolButton = $('.symbol-vis')

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

// Load language data into Observable
let datasetStream = Rx.Observable
    .fromPromise($.getJSON('languages.json')) // async load json
    .flatMap(Rx.Observable.from) // convert flat array into sequence
    .map((book) => {
        return {
            label: book.label,
            data: book.data,
            backgroundColor: palette // add color to each book dataset
        }
    })
    .toArray() // flatten sequence back into array
    .map((books) => {
        return books.sort((a, b) => { // sort book datasets by total annotation count
            return b.data.reduce((acc, cur) => acc + cur) - a.data.reduce((acc, cur) => acc + cur)
        })
    })
    // .flatMap(Rx.Observable.from) // convert array back into sequence
    .map((arr) => {
        return arr.slice(0, 5)
    })
    // .take(5) // limit to top 5 books by annotation count
    // .toArray() // flatten sequence into array again

// Create a version that doesn't include symbol data
let nonSymbolStream = Rx.Observable
    .fromPromise($.getJSON('languages.json')) // async load json
    .flatMap(Rx.Observable.from) // convert flat array into sequence
    .map((book) => {
        return {
            label: book.label,
            data: book.data.slice(0, 3),
            backgroundColor: palette // add color to each book dataset
        }
    })
    .toArray() // flatten sequence back into array
    .map((books) => {
        return books.sort((a, b) => { // sort book datasets by total annotation count
            return b.data.reduce((acc, cur) => acc + cur) - a.data.reduce((acc, cur) => acc + cur)
        })
    })
    // .flatMap(Rx.Observable.from) // convert array back into sequence
    .map((arr) => {
        return arr.slice(0, 5)
    })
    // .take(5) // limit to top 5 books by annotation count
    // .toArray() // flatten sequence into array again

// Capture button clicks as Observable
let buttonStream = Rx.Observable.fromEvent(symbolButton, 'click')

let combinedStream = Rx.Observable
    .combineLatest(buttonStream, datasetStream, nonSymbolStream)

datasetStream
    .take(1)
    .subscribe(populatePieChart)

combinedStream.subscribe(([e, ds, ns]) => {
    if ($(e.target).hasClass('hide')) {
        // console.log('showing', ds, ns)
        updatePieChart(ds)
    }
    else {
        // console.log('hiding', ds, ns)
        updatePieChart(ns)
    }
})

buttonStream.subscribe(toggleSymbolsButton)
