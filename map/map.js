/**
 * Generate and style a marker for each publication place.
 * Uses createBookIcon() to generate the icon for each marker.
 * Uses createBookPopup() to generate the popup text for each marker.
 * @param  {obj}    feature   feature data from geoJSON
 * @param  {obj}    latlng    latitude and longitude data from geoJSON
 * @return {obj}              leaflet styled marker (L.marker)
 */
function booksStyle(feature, latlng) {
  return L
    .marker(latlng, {
      icon: createBookIcon(feature),
      title: feature.properties['publication place'],
      alt: `books published in ${feature.properties['publication place']}`,
      riseOnHover: true,
    })
    .bindPopup(`<h4>${feature.properties['publication place']}</h4>`)
}

/**
 * Bind interaction events to each point in the layer.
 * @param  {obj}    feature   feature data from geoJSON
 * @param  {obj}    layer     layer data from geoJSON
 */
function booksInteract(feature, layer) {
  layer.on({
    mouseover: function(e) {
      console.log(e.target)
    },
    mouseout: (e) => {
      booksLayer.resetStyle(e.target)
    },
    click: function(e) {
      console.log(e)
      $('#info').html(createBookInfo(e.target.feature))
    },
  })
}

/**
 * Generate the html that will be displayed when the user clicks on a marker.
 * Uses sortBooks() to sort the book listings.
 * Uses formatBook() to generate the html for each book.
 * @param  {obj}    feature   feature data from geoJSON
 * @return {str}              html for the popup
 */
function createBookInfo(feature) {
  let books = sortBooks(feature.properties.books)
  let booksList = books.map((book) => {
    let listing = formatBook(book)
    return `<li class="list-group-item">${listing}</li>`
  }).join('')
  return `
  <div class="books-popup">
    <h4>${feature.properties['publication place']}</h4>
    <ul class="list-group">
      ${booksList}
    </ul>
  </div>
  `
}

/**
 * Utility function to sort a list of books by date, ascending.
 * @param  {str[]}    books   list of books
 * @return {str[]}            sorted list of books
 */
function sortBooks(books) {
  return books.sort((a, b) => {
    // matches e.g. "... (1884)"
    let date1 = a.match(/\((\d{4})\)$/)[1]
    let date2 = b.match(/\((\d{4})\)$/)[1]
    return date1 - date2
  })
}

/**
 * Utility function to format book listings.
 * Adds an ellipsis and truncates book titles longer than 75 characters.
 * Italicizes book titles and bolds publication year.
 * @param  {str}     book     book title and date
 * @return {str}              truncated book listing (including date)
 */
function formatBook(book) {
  // matches e.g. "The Adventures of Huckleberry Finn (1884)"
  let parts = book.match(/^(.*)\s{1}\((\d{4})\)$/)
  let title = parts[1]
  let year = parts[2]
  let trunc = title.length > 75 ? title.substring(0, 75) + '...' : title
  return `<i>${trunc}</i> (<b>${year}</b>)`
}

/**
* Generate an icon by scaling an image according to the number of books
* associated with the point feature
* @param  {obj}    feature   feature data from geoJSON
* @return {obj}              leaflet icon (L.icon)
*/
function createBookIcon(feature) {
  // one could replace the divisor in the equation below to adjust scaling
  let scaleFactor = 1 + (feature.properties.books.length / 5)
  return L.icon({
    iconUrl: './icon/book.png',
    shadowUrl: './icon/shadow.png',
    iconSize: [40 * scaleFactor, 40 * scaleFactor],
    shadowSize: [53 * scaleFactor, 30 * scaleFactor],
    iconAnchor: [20 * scaleFactor, 40 * scaleFactor],
    shadowAnchor: [20 * scaleFactor, 29 * scaleFactor],
    popupAnchor: [0, -40 * scaleFactor],
  })
}

// Set up the basemaps.
let historicBase = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 10,
  id: 'mapbox.pirates',
  accessToken: 'pk.eyJ1IjoiYnVkYWsiLCJhIjoiY2piNXBlb3dkMzhtMjJ3czdyaGt1dnUybSJ9.m9C_q_UaQm3YCU8iK6Ikcg',
})
let modernBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
})
let baseMaps = {
  'Historic basemap': historicBase,
  'Modern basemp': modernBase,
}

// Set up the books layer.
let booksLayer = L.geoJson(null, {
  pointToLayer: booksStyle,
  onEachFeature: booksInteract,
})

// Set up the map itself.
let map = L.map('map', {
  center: [48.6216826, 6.4805313],
  zoom: 6,
  layers: [historicBase, booksLayer],
})
L.control.layers(baseMaps, null, {collapsed: false}).addTo(map)

// Asynchronously fetch and populate layer data from geoJSON.
$.getJSON('./books.geojson', (books) => booksLayer.addData(books))
