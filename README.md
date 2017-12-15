# winthrop
data visualizations using the Princeton CDH's Winthrop Family on the Page project data.

## contents

| link | description |
|-|-|
| [books](https://thatbudakguy.github.io/winthrop/map) | map of the winthrops' books, using [leaflet.js](http://leafletjs.com/) |
| [people](https://thatbudakguy.github.io/winthrop/people) | sankey diagram of the winthrops' annotation behaviors using [google charts](https://developers.google.com/chart/)|
| [languages](https://thatbudakguy.github.io/winthrop/lang) | nested pie charts visualizing the language the winthrops annotated in using [chart.js](http://www.chartjs.org)|

## developing
you'll need node.js 8 and npm.

check out the repository, then:

```sh
$ npm install
$ npm start
```

you'll get a live development server at [localhost:3000](http://localhost:3000). changes will be reflected automatically using [browsersync](https://www.browsersync.io/). linter output from [eslint](https://eslint.org/) will appear in the console.

you can lint the code as a standalone task with:

```sh
$ npm run lint
```

linter settings are in the `.eslintrc.json` file.
