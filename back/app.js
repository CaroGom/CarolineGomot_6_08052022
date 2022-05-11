const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const UserRoutes = require('./routes/User');
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

//setting up image request management
app.use('/images', express.static(path.join(__dirname, 'images')))


//setting up GET route
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use ('/api/sauce', SauceRoutes);
app.use ('/api/auth', UserRoutes);

module.exports = app;