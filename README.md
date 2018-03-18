Source files for los_presidenciables
=====

## Preview

[You can find a preview of 'los_presidenciables' here](https://la-silla-vacia.github.io/los_presidenciables)

![](https://raw.githubusercontent.com/la-silla-vacia/los_presidenciables/master/dev/screenshot.png)

## Data
Please link to any external data used, as well as scripts for cleaning and analyzing that data, all of which should live in the `/data` directory.

## Installation
First, make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/en/) installed on your operating system.

After cloning the repository run inside the directory:
```
yarn install
```

To start watching the project and opening in the browser run:
```
yarn start
```

To deploy to GitHub Pages run:
```
yarn run deploy
```

---

## Embeding on webpage
To embed on a webpage use this code:
```html
<!-- START OF OUR INTERACTIVE -->
<script type="text/javascript">
window.los_presidenciables_data = {
  "dataUri": "https://lsv-data-visualizations.firebaseio.com/los_presidenciables.json"
}
</script>
<div class="lsv-interactive" id="los_presidenciables">
<img src="https://raw.githubusercontent.com/la-silla-vacia/lsv-interactive/master/misc/lsvi-loading.gif"
     alt="Interactive is loading" style="width:100%;max-width: 320px;margin: 4em auto;display: block;">
</div>
<link type="text/css" rel="stylesheet" href="https://la-silla-vacia.github.io/los_presidenciables/styles.css" />
<script defer type="text/javascript" src="https://la-silla-vacia.github.io/los_presidenciables/script.js"></script>
<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1328_RC04/embed_loader.js"></script>
<!-- END OF OUR INTERACTIE -->
```
