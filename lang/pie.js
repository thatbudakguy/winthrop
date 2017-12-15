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
    .map((arr) => {
        return arr.slice(0, 5) // limit to top 5 books by annotation count
    })

// Create a version that doesn't include symbol data
let nonSymbolStream = Rx.Observable
    .fromPromise($.getJSON('languages.json'))
    .flatMap(Rx.Observable.from)
    .map((book) => {
        return {
            label: book.label,
            data: book.data.slice(0, 3), // don't include symbol data
            backgroundColor: palette
        }
    })
    .toArray()
    .map((books) => {
        return books.sort((a, b) => {
            return b.data.reduce((acc, cur) => acc + cur) - a.data.reduce((acc, cur) => acc + cur)
        })
    })
    .map((arr) => {
        return arr.slice(0, 5)
    })

// Capture button clicks as Observable
let buttonStream = Rx.Observable.fromEvent(symbolButton, 'click')

// Get latest values when the button is clicked
let combinedStream = Rx.Observable
    .combineLatest(buttonStream, datasetStream, nonSymbolStream)

// Populate the pie chart initially
datasetStream
    .take(1)
    .subscribe((datasets) => {
        datasets.forEach((book) => pieChart.data.datasets.push(book))
        pieChart.update()
    })

// Watch for button presses and load the appropriate datastream
combinedStream.subscribe(([e, ds, ns]) => {
    if ($(e.target).hasClass('hide')) {
        pieChart.data.datasets = ds
    }
    else {
        pieChart.data.datasets = ns
    }
    pieChart.update()
})

// Update the button's html on button presses
buttonStream.subscribe(() => {
    let newText = symbolButton.text() === 'Hide symbols' ? 'Show symbols' : 'Hide symbols'
    symbolButton
        .toggleClass('hide')
        .toggleClass('show')
        .text(newText)
})
