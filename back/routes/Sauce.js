const { Router } = require('express');
const express = require('express');
const router = express.Router();

//getting the model
const Sauce = require('../models/sauce');

router.post('/', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  });

  //using get to display sauce array in json
router.get('/s', (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  });
  
  //modify an object
router.put('/:id', (req, res, next) => {
    Sauce.updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
      .then(() => res.status(200).json({ message : 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
  //delete an object
router.delete('/:id', (req, res, next) =>{
    Sauce.deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({ message : 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }))
  });

module.exports = router;