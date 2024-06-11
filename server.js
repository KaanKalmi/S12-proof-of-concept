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


// ROUTES
app.get('/', function (request, response) {  
    response.render('index', {
        current: '/en', 
        images: imagesData.data
    })
})

app.post('/more', (request, response) => {   
     // Ophalen afbeeldingen   
    const images = imagesData.data 
    // Shuffelen 
    function shuffle(array) {    
        // Shuffle code   
        for (let i = array.length - 1; i > 0; i--) {      
            // Random index selecteren     
            let j = Math.floor(Math.random() * (i + 1));      
            // Items swappen     
            [array[i], array[j]] = [array[j], array[i]];   
        }   
    }
    shuffle(images) 

    response.render('index', {     
        images,
        current: '/en' 
    });  
}) 


app.get('/ar', function (request, response) {  
    response.render('index', {
        current: '/ar', 
        images: imagesData.data        
    })
})

// app.get('/', function (request, response) { 
//     const images = imagesData.data
//     const page = parseInt(request.query.page)
//     const limit = parseInt(request.query.limit)

//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     const resultImages = images.slice(startIndex, endIndex)
//     console.log(resultImages)

//     const results = {}

//     if (endIndex < images.length) {
//         results.next = {
//             page: page + 1,
//             limit: limit
//         }
//     }

//     if (startIndex > 0) {
//         results.previous = {
//             page: page - 1,
//             limit: limit
//         }
//     }

//     response.render('index', {
//         current: '/en', 
//         images: images
//     })
// })