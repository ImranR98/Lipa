//Add required Modules
const express = require('express')
const app = express()
const path = require('path')

//Set folder where compiled client App is located
app.use(express.static(__dirname + '/dist/lipa'));

//Set folder where book images are located
app.use('/static', express.static(__dirname + '/static'));

//All routes are handled by the Angular App which is served here
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/lipa/index.html'));
});

//Set Port
let HTTP_PORT = process.env.PORT || 8080;

//Start Server
app.listen(HTTP_PORT, function () {
    console.log('app listening on: ' + HTTP_PORT)
});