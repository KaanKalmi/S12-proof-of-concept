import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 8009)

app.listen(app.get('port'), function () {
 console.log(`Application started on http://localhost:${app.get('port')}`)
})

app.get('/', req res) function{
 res.render('index', iets)
 console.log('if you see this message the page loaded correctly')
}

const mp3 = http://playerservices.streamtheworld.com/api/livestream-redirect/BNR_BUSINESS_BEATS.mp3,
      article = https://api.mobile.bnr.nl/v1/articles;
