//Add required Modules
const express = require('express')
const app = express()

//Set folder where compiled client App is located
app.use(express.static(__dirname + '/dist/lipa'))

//All routes are handled by the Angular App which is served here
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/lipa/index.html')
});

//Set Port
let HTTP_PORT = process.env.PORT || 8080;

//Start Server
app.listen(HTTP_PORT, function () {
    console.log(`App running on port ${HTTP_PORT}.`)
});