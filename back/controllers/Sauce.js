const Sauce = require('../models/sauce');
const fs = require('fs');


//exporting function that creates sauce
exports.createSauce = (req, res, next) => {
      //handling multer body change with object
      const sauceObject = JSON.parse(req.body.sauce);
      //deleting from object MongoDB assigned ID for post
      //delete sauceObject._id;
      //new Sauce that requests the body of the post with spread function ...
      const sauce = new Sauce({
        ...sauceObject,
        //setting the img url using path that leads to images with their automatically generated name
        imageUrl: `${req.protocol}://${req.get('host')}/images${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
      });
      //saving Sauce posted with promise to get out of expired request = status of request registered in json files
      sauce.save()
        .then(() => res.status(201).json({message : 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
  };

  //exporting function that selects one sauce
  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
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
     } : { ...req.body };
     Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
        if (sauce.userId !== req.auth.userId) {
          return res.status(403).json({ error : "Unauthorized request"});
        }
      
        Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id : req.params.id})
          .then(() => {
            res.status(201).json({ message : 'Objet modifié !'})
          })
          .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
  };

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

//like and dislike

exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    //if a user disliked a sauce
    case -1 :
      Sauce.findOne({_id: req.params.id})
      .then( sauce => {
        //did they already dislike it
        if (sauce.usersDisliked.includes(req.body.userId)){
          res.status(208).json({error : 'Sauce already disliked'})
        } 
        //did they already like it
        else if (sauce.usersLiked.includes(req.body.userId)){
          res.status(208).json({error : 'Sauce cannot be liked and disliked at the same time'})
        } 
        //if not, dislike the sauce
        else {
          Sauce.updateOne(
            {_id: req.params.id},
            {
              $inc: {dislikes: 1},
              $push: {usersDisliked: req.body.userId},
            }
            )
            .then (() => res.status(200).json({message : "Sauce disliked !"}))
            .catch(error => res.status(400).json({error}))
          }
        })
      .catch(error => res.status(404).json({error}))
    break;

    //if there is no like or dislike, accessing the sauce
    case 0: 
      Sauce.findOne({_id: req.params.id})
      .then (sauce => {
        if (sauce.usersLiked.includes(req.body.userId)){
          Sauce.updateOne(
            {_id: req.params.id},
            {
              $inc: {likes: -1},
              $pull: {usersLiked: req.body.userId},
            }
          )
            .then(() => res.status(200).json({message : "Sauce no longer liked !"}))
            .catch(error => res.status(400).json({error}))
        } else if (sauce.usersDisliked.includes(req.body.userId)){
          Sauce.updateOne(
            {_id: req.params.id},
            {
              $inc: {dislikes: -1},
              $pull: {usersDisliked: req.body.userId},
            }
          )
            .then(() => res.status(200).json({message : "Sauce no longer disliked !"}))
            .catch(error => res.status(400).json({error}))
        }

      })
      .catch(error => res.status(404).json({error}))
    break;

  case 1:  Sauce.findOne({_id: req.params.id})
  .then( sauce => {
    //did they already like it
    if (sauce.usersLiked.includes(req.body.userId)){
      res.status(208).json({error : 'Sauce already liked'})
    } 
    //did they already like it
    else if (sauce.usersDisliked.includes(req.body.userId)){
      res.status(208).json({error : 'Sauce cannot be liked and disliked at the same time'})
    } 
    //if not, like the sauce
    else {
      Sauce.updateOne(
        {_id: req.params.id},
        {
          $inc: {likes: 1},
          $push: {usersLiked: req.body.userId},
        }
        )
        .then (() => res.status(200).json({message : "Sauce liked !"}))
        .catch(error => res.status(400).json({error}))
      }
    })
  .catch(error => res.status(404).json({error}))
break;
  }
}