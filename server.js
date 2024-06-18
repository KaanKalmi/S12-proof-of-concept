// imports
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

// variabelen
const app = express();
const articles = await fetchJson('https://api.mobile.bnr.nl/v1/articles');
const mp3 = 'http://playerservices.streamtheworld.com/api/livestream-redirect/BNR_BUSINESS_BEATS.mp3';

// opzet project
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 8009)

app.listen(app.get('port'), function () {
 console.log(`Application started on http://localhost:${app.get('port')}`)
})

// GET ROUTES
// maak route aan met /articles en haal de data op van de api, hierdoor kan ik de data herladen op de pagina zonder de server te herstarten
app.get('/articles', async function(req, res) {
  const articles = await fetchJson('https://api.mobile.bnr.nl/v1/articles');
  res.json(articles);
})

// maak route aan waarbij de data van de route hierboven word opgehaald, laad vervolgens de index in met de 2 variabelen.
app.get('/', async function(req, res){
  const response = await fetch('http://localhost:' + app.get('port') + '/articles');
  const articles = await response.json();

  res.render('index', {
      articles: articles,
      mp3: mp3
  })
  console.log('if you see this message the page loaded correctly')
});