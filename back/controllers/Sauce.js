const Sauce = require('../models/sauce');
const fs = require('fs');


//exporting function that creates sauce
exports.createSauce = (req, res, next) => {
      //handling multer body change with object
      const sauceObject = JSON.parse(req.body.thing)
      //deleting from object MongoDB assigned ID for post
      delete sauceObject._id;
      //new Sauce that requests the body of the post with spread function ...
      const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images${req.file.filename}`
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
    //setting up multer conditions on whether an image exists or not
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images${req.file.filename}`
     } : { ...req.body }
    Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id : req.params.id})
      .then(() => res.status(200).json({ message : 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

  //exports function that deletes a sauce
  exports.deleteSauce = (req, res, next) =>{
    Sauce.findOne({_id: req.params.id})
      .then(sauce => {
        //gives an array of two elements, one is all that is before /images/ in url, one is what is after = filename
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id : req.params.id})
          .then(() => res.status(200).json({ message : 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }))
        })
      })
      .catch(error => res.status(500).json({ error }))
    Sauce.findOne({_id :req.params.id}).then(
      (sauce) =>{
        if(!sauce){
          return res.status(404).json({
            error: new Error('Sauce non trouvée')})
        }
        if(sauce.userId !== req.auth.userId){
          return res.status(401).json({
            error: new Error('Requête non autorisée')
          })
        }

      }
    )

  }