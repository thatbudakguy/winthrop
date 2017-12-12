// Load google charts sankey package and set callback.
google.charts.load('current', {packages: ['sankey']})
google.charts.setOnLoadCallback(drawChart)

/**
 * Draw the Sankey diagram.
 */
 function drawChart() {
  let data = new google.visualization.DataTable()
  data.addColumn('string', 'From')
  data.addColumn('string', 'To')
  data.addColumn('number', 'Count')
  data.addRows([
    // lv 1
    ['(no annotator)', '(no subject)', 95],
    ['(no annotator)', 'Alchemy', 4],
    ['(no annotator)', 'Astronomy/Cosmology', 1],
    ['(no annotator)', 'Chronology', 15],
    ['(no annotator)', 'Commentary', 1],
    ['(no annotator)', 'Didactic', 1],
    ['(no annotator)', 'Historia', 9],
    ['(no annotator)', 'Law', 1],
    ['(no annotator)', 'Literature (Classical)', 2],
    ['(no annotator)', 'Philosophy', 1],
    ['(no annotator)', 'Religion', 7],
    ['(no annotator)', 'Statecraft', 6],
    ['Adam Winthrop', '(no subject)', 15],
    ['Adam Winthrop', 'Commentary', 9],
    ['Adam Winthrop', 'Didactic', 5],
    ['Adam Winthrop', 'Historia', 19],
    ['Adam Winthrop', 'Language', 1],
    ['Adam Winthrop', 'Law', 12],
    ['Adam Winthrop', 'Literature (Classical)', 1],
    ['Adam Winthrop', 'Philosophy', 5],
    ['Adam Winthrop', 'Religion', 1],
    ['Forth Winthrop', '(no subject)', 6],
    ['Forth Winthrop', 'Literature (Classical)', 1],
    ['John Winthrop, FRS', '(no subject)', 3],
    ['John Winthrop, Jr', 'Astronomy/Cosmology', 1],
    ['Wait Winthrop', '(no subject)', 2],
    // lv 2]
    ['(no subject)', '(no tag)', 5],
    ['(no subject)', 'dash', 46],
    ['(no subject)', 'handwriting sample', 2],
    ['(no subject)', 'image', 3],
    ['(no subject)', 'inventory record', 1],
    ['(no subject)', 'manicule', 4],
    ['(no subject)', 'mathematical/arithmetical content', 1],
    ['(no subject)', 'monad', 7],
    ['(no subject)', 'probatio pennae', 3],
    ['(no subject)', 'signature', 17],
    ['(no subject)', 'textual annotation', 18],
    ['(no subject)', 'trouble', 5],
    ['(no subject)', 'underlining', 9],
    ['Alchemy', '(no tag)', 2],
    ['Alchemy', 'textual annotation', 2],
    ['Astronomy/Cosmology', 'textual annotation', 2],
    ['Chronology', 'dash', 9],
    ['Chronology', 'textual annotation', 3],
    ['Chronology', 'underlining', 3],
    ['Commentary', '(no tag)', 2],
    ['Commentary', 'dash', 1],
    ['Commentary', 'manicule', 1],
    ['Commentary', 'textual annotation', 4],
    ['Commentary', 'vertical line in margin', 2],
    ['Didactic', 'manicule', 2],
    ['Didactic', 'textual annotation', 4],
    ['Historia', 'manicule', 5],
    ['Historia', 'textual annotation', 16],
    ['Historia', 'underlining', 7],
    ['Language', 'textual annotation', 1],
    ['Law', 'manicule', 5],
    ['Law', 'textual annotation', 8],
    ['Literature (Classical)', 'signature', 1],
    ['Literature (Classical)', 'textual annotation', 2],
    ['Literature (Classical)', 'underlining', 1],
    ['Philosophy', 'manicule', 1],
    ['Philosophy', 'textual annotation', 4],
    ['Philosophy', 'underlining', 1],
    ['Religion', 'dash', 1],
    ['Religion', 'monad', 2],
    ['Religion', 'signature', 2],
    ['Religion', 'textual annotation', 2],
    ['Religion', 'underlining', 1],
    ['Statecraft', 'textual annotation', 1],
    ['Statecraft', 'underlining', 5],
  ])

  // Set diagram options
  let options = {
    sankey: {
      node: {
        label: {
          fontSize: 16,
        },
      },
      link: {
        colorMode: 'gradient',
      },
    },
  }

  // Create the diagram
  let element = document.getElementById('people')
  let diagram = new google.visualization.Sankey(element)
  diagram.draw(data, options)
 }
