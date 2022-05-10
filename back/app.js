const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
//getting the model
const Sauce = require('./models/sauce');

//code to connect file to MongoDB
mongoose.connect('mongodb+srv://PiiquanteAdmin:Piiquante.DB@cluster0.6byal.mongodb.net/PiiquanteDB?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();



  
//setting up POST route
app.use(express.json());

app.post('/api/sauce', (req, res, next) => {
  //deleting from object MongoDB assigned ID for post
    delete req.body._id;
    //new Sauce that requests the body of the post with spread function ...
    const sauce = new Sauce({
      ...req.body
    })
    //saving Sauce posted with promise to get out of expired request = status of request registered in json files
    sauce.save()
      .then(() => res.status(201).json({message : 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});
//get one object from Sauces
app.get('/api/sauce/:id', (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});
//setting up GET route
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//using get to display sauce array in json
app.use('/api/sauces', (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});

//modify an object
app.put('/api/sauce/:id', (req, res, next) => {
  Sauce.updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
    .then(() => res.status(200).json({ message : 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//delete an object
app.delete('/api/sauce/:id', (req, res, next) =>{
  Sauce.deleteOne({_id : req.params.id})
  .then(() => res.status(200).json({ message : 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }))
})

module.exports = app;