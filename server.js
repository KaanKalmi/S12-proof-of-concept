//EXPRESS STUFF
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.set('port', process.env.PORT || 8001)

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

// BASIS ENDPOINTS
const apiUrl = 'https://fdnd-agency.directus.app/items'
const imagesData =  await fetchJson(apiUrl + '/fabrique_art_objects/?fields=*,image.height,image.width,image.id')
console.log(imagesData.data)

// ROUTES
app.get('/', function (request, response) {  
    response.render('index', {
        current: '/en', 
        images: imagesData.data
    })
})

app.get('/ar', function (request, response) {  
    response.render('index', {
        current: '/ar', 
        images: imagesData.data        
    })
})