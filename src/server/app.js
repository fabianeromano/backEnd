const express = require('express')
const routes = require('./routes')

const app = express();
app.use(express.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
app.use('/api/productos', routes);

module.exports = app;