const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

// Usar body-parser como middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const routes = require('./routes/routes.js');
app.use('/', routes);

const port = 4500;

app.listen(port,()=>{
console.log("ss")
})

