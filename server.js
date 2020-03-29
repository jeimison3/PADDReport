const express = require("express")
const bodyParser = require('body-parser')
const app = express()

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



// Rotas estáticas
app.use('/public', express.static('node_modules')) // Serve a pasta node_modules estaticamente em /public
app.use('/local', express.static('local'))
app.use('/sw-1.js', express.static('sw/sw-1.js'))
app.use('/manifest.json', express.static('manifest.json'))

// Rotas de clientes
app.get('/', (req, res) => {
    app.set('view engine', 'pug')
    res.render('login', {title:'Login'})
})

app.get('/login', (req, res) => {
    app.set('view engine', 'pug')
    res.render('login', {title:'Login'})
})

app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
})

app.get('/login', function (req, res) {
    
})



// Rotas para API
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
})



// Servidor:
app.listen(3000, ()=>{
    console.log("Iniciado na porta 3000.")
})

//exports = module.exports = app