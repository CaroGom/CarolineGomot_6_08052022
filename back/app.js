const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

//setting up routes to user and sauce
const UserRoutes = require('./routes/User');
const SauceRoutes = require('./routes/Sauce');

const app = express();

//code to connect file to MongoDB
mongoose.connect('mongodb+srv://PiiquanteAdmin:Piiquante.DB@cluster0.6byal.mongodb.net/PiiquanteDB?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//setting up POST route
app.use(express.json());



//setting up GET route by adding headers 
app.use((req, res, next) => {
  //allowing the website I want 
    res.setHeader('Access-Control-Allow-Origin', '*');
  //requesting headers I wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //requesting methods of requests I wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//setting up image request management
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/sauces', SauceRoutes);
//app.use ('/api/sauces', SauceRoutes);
app.use ('/api/auth', UserRoutes);

module.exports = app;