const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const SauceRoutes = require('./routes/Sauce');

//code to connect file to MongoDB
mongoose.connect('mongodb+srv://PiiquanteAdmin:Piiquante.DB@cluster0.6byal.mongodb.net/PiiquanteDB?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();



  
//setting up POST route
app.use(express.json());


//setting up GET route
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use ('api/sauce', SauceRoutes)

module.exports = app;