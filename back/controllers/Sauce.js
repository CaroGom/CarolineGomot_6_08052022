const Sauce = require('../models/sauce');


//exporting function that creates sauce
exports.createSauce = (req, res, next) => {
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
  };

  //exporting function that selects one sauce
  exports.getSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };

  //exporting function that gets all sauces
  exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  }

  //exporting function that modifies a sauce
  exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
      .then(() => res.status(200).json({ message : 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

  //exports function that deletes a sauce
  exports.deleteSauce = (req, res, next) =>{
    Sauce.deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({ message : 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }))
  }