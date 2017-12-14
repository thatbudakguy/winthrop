/* eslint-disable max-len */

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

let dataStream = Rx.Observable
    .fromPromise($.getJSON('languages.json'))
    .flatMap(Rx.Observable.from)
    .map((book) => {
        return {
            label: book.label,
            data: book.data,
            backgroundColor: palettes.a
        }
    })
    .toArray()
    .map((books) => {
        return books.sort((a, b) => {
            return b.data.reduce((acc, cur) => acc + cur) - a.data.reduce((acc, cur) => acc + cur)
        })
    })
    .flatMap(Rx.Observable.from)
    .take(5)
    .toArray()

dataStream.first().subscribe((datasets) => {
    datasets.map((book) => pieChart.data.datasets.push(book))
    pieChart.update()
})

let buttonStream = Rx.Observable.fromEvent($('.symbol-vis'), 'click')

let combinedStream = Rx.Observable
    .combineLatest(dataStream, buttonStream, (datasets) => {
        if ($('.symbol-vis').hasClass('show')) {
            return datasets.map((book) => {
                return {
                    label: book.label,
                    data: book.data.slice(0, 3),
                    backgroundColor: palettes.a
                }
            })
        }
        return datasets
    })

let barStream = combinedStream
    .flatMap(Rx.Observable.from)
    .map((book) => {
        return {
            label: 'annotations',
            data: book.data.reduce((acc, cur) => acc + cur),
            backgroundColor: palettes.b
        }
    })

barStream.subscribe((datasets) => {
    pieChart.data.datasets.forEach((book) => book.data.pop())
    pieChart.data.datasets.forEach((book, i) => book.data.push(datasets[i].data))
    pieChart.update()
})

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

buttonStream.subscribe((e) => {
    $('.symbol-vis')
        .toggleClass('hide')
        .toggleClass('show')
        .text(() => {
            return $('.symbol-vis').text() === 'Hide symbols' ? 'Show symbols' : 'Hide symbols'
        })
})
