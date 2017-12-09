// basemap
// TODO get a historical one
let baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
})

// overlay styles
let booksStyle = (feature, latlng) => {
  return L.marker(latlng, {icon: blackBook})
}

// overlay
// TODO add point styling
// TODO differentiate betw. individual books
let booksLayer = L.geoJson(null, {pointToLayer: booksStyle})

// point styles
let BookIcon = L.Icon.extend({
  options: {
    shadowUrl: './icon/book_shadow.png',
    iconSize: [50, 50],
    shadowSize: [66, 38],
    iconAnchor: [25, 50],
    shadowAnchor: [25, 36],
    popupAnchor: [0, -5],
  },
})
let blackBook = new BookIcon({iconUrl: './icon/book_b.png'})
// let redBook = new BookIcon({iconUrl: './icon/book_r.png'})
// let yellowBook = new BookIcon({iconUrl: './icon/book_y.png'})

// map
L.map('map', {
  center: [48.1216826, 6.4805313],
  zoom: 6,
  layers: [baseLayer, booksLayer],
})

// async fetch layer data
$.getJSON('./books.geojson', (books) => booksLayer.addData(books))
