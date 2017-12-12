/* eslint-disable max-len */
google.charts.load('current', {
  'packages': ['treemap'],
})
google.charts.setOnLoadCallback(drawChart)

/**
 * [drawChart description]
 */
function drawChart() {
  let annotations = [
    ['Label', 'Parent', 'Annotation Volume'],
    ['Winthrops', null, 0],
    ['Adam Winthrop', 'Winthrops', 0],
    ['Forth Winthrop', 'Winthrops', 0],
    ['John Winthrop FRS', 'Winthrops', 0],
    ['Wait Winthrop', 'Winthrops', 0],
    ['John Winthrop Jr', 'Winthrops', 0],
    ['Adam Winthrop - Commentary', 'Adam Winthrop', 0],
    ['Adam Winthrop - Didactic', 'Adam Winthrop', 0],
    ['Adam Winthrop - Historia', 'Adam Winthrop', 0],
    ['Adam Winthrop - Language', 'Adam Winthrop', 0],
    ['Adam Winthrop - Law', 'Adam Winthrop', 0],
    ['Adam Winthrop - Literature (Classical)', 'Adam Winthrop', 0],
    ['Adam Winthrop - no subject', 'Adam Winthrop', 0],
    ['Adam Winthrop - Philosophy', 'Adam Winthrop', 0],
    ['Adam Winthrop - Religion', 'Adam Winthrop', 0],
    ['Forth Winthrop - Literature (Classical)', 'Forth Winthrop', 0],
    ['Forth Winthrop - no subject', 'Forth Winthrop', 0],
    ['John Winthrop FRS - no subject', 'John Winthrop FRS', 0],
    ['John Winthrop Jr - Astronomy/Cosmology', 'John Winthrop Jr', 0],
    ['Wait Winthrop - no subject', 'Wait Winthrop', 0],
    ['textual annotation -  Adam Winthrop - Commentary', 'Adam Winthrop - Commentary', 3],
    ['no tag -  Adam Winthrop - Commentary', 'Adam Winthrop - Commentary', 2],
    ['manicule -  Adam Winthrop - Commentary', 'Adam Winthrop - Commentary', 1],
    ['vertical line in margin -  Adam Winthrop - Commentary', 'Adam Winthrop - Commentary', 2],
    ['dash -  Adam Winthrop - Commentary', 'Adam Winthrop - Commentary', 1],
    ['textual annotation -  Adam Winthrop - Didactic', 'Adam Winthrop - Didactic', 4],
    ['manicule -  Adam Winthrop - Didactic', 'Adam Winthrop - Didactic', 1],
    ['textual annotation -  Adam Winthrop - Historia', 'Adam Winthrop - Historia', 13],
    ['manicule -  Adam Winthrop - Historia', 'Adam Winthrop - Historia', 5],
    ['underlining -  Adam Winthrop - Historia', 'Adam Winthrop - Historia', 1],
    ['textual annotation -  Adam Winthrop - Language', 'Adam Winthrop - Language', 1],
    ['textual annotation -  Adam Winthrop - Law', 'Adam Winthrop - Law', 7],
    ['manicule -  Adam Winthrop - Law', 'Adam Winthrop - Law', 5],
    ['textual annotation -  Adam Winthrop - Literature (Classical)', 'Adam Winthrop - Literature (Classical)', 1],
    ['textual annotation -  Adam Winthrop - no subject', 'Adam Winthrop - no subject', 6],
    ['no tag -  Adam Winthrop - no subject', 'Adam Winthrop - no subject', 2],
    ['manicule -  Adam Winthrop - no subject', 'Adam Winthrop - no subject', 3],
    ['signature -  Adam Winthrop - no subject', 'Adam Winthrop - no subject', 2],
    ['handwriting -  Adam Winthrop - no subject', 'Adam Winthrop - no subject', 2],
    ['textual annotation -  Adam Winthrop - Philosophy', 'Adam Winthrop - Philosophy', 4],
    ['manicule -  Adam Winthrop - Philosophy', 'Adam Winthrop - Philosophy', 1],
    ['textual annotation -  Adam Winthrop - Religion', 'Adam Winthrop - Religion', 1],
    ['signature -  Forth Winthrop - Literature (Classical)', 'Forth Winthrop - Literature (Classical)', 1],
    ['textual annotation -  Forth Winthrop - no subject', 'Forth Winthrop - no subject', 3],
    ['signature -  Forth Winthrop - no subject', 'Forth Winthrop - no subject', 2],
    ['probatio penne -  Forth Winthrop - no subject', 'Forth Winthrop - no subject', 1],
    ['textual annotation -  John Winthrop FRS - no subject', 'John Winthrop FRS - no subject', 1],
    ['signature -  John Winthrop FRS - no subject', 'John Winthrop FRS - no subject', 2],
    ['textual annotation -  John Winthrop Jr - Astronomy/Cosmology', 'John Winthrop Jr - Astronomy/Cosmology', 1],
    ['signature -  Wait Winthrop - no subject', 'Wait Winthrop - no subject', 1],
    ['monad -  Wait Winthrop - no subject', 'Wait Winthrop - no subject', 1],
  ]
  let data = google.visualization.arrayToDataTable(annotations)
  tree = new google.visualization.TreeMap(document.getElementById('people'))
  tree.draw(data, {
    minColor: '#6497b1',
    midColor: '#005b96',
    maxColor: '#03396c',
    headerColor: '#000',
    headerHeight: 25,
    fontColor: 'white',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontSize: 16,
    showScale: true,
  })
}
