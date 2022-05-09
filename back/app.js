const mongoose = require('mongoose');
const express = require('express');

const app = express();

mongoose.connect('mongodb+srv://PiiquanteAdmin:PiiquanteDB@cluster0.6byal.mongodb.net/PiiquanteDB?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
//setting up POST route
app.use(express.json());

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !',
      userId: 'bcjsknopsdhcuibeujkn',
      //token: string,
    });
  });

//setting up GET route
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/sauces', (req, res, next) => {
    const sauces = [

        {
          userId: 'userId1',
          name: 'sauceName1',
          manufacturer: 'sauceMaker1',
          description: 'sauceDescription1',
          mainPepper: 'mainPepper1',
          imageUrl: 'https://site.com/img/image.jpg',
          heat: 9,
          likes: 12,
          dislikes: 58,
          usersLiked: 'Users who liked1',
          usersDisliked: 'Users who disliked1'
        },
        {
          userId: 'userId2',
          name: 'sauceName2',
          manufacturer: 'sauceMaker2',
          description: 'sauceDescription2',
          mainPepper: 'mainPepper2',
          imageUrl: 'https://site.com/img/image.jpg',
          heat: 8,
          likes: 76,
          dislikes: 18,
          usersLiked: 'Users who liked2',
          usersDisliked: 'Users who disliked2'
        },
        {
          userId: 'userId3',
          name: 'sauceName3',
          manufacturer: 'sauceMaker3',
          description: 'sauceDescription3',
          mainPepper: 'mainPepper3',
          imageUrl: 'https://site.com/img/image.jpg',
          heat: 4,
          likes: 69,
          dislikes: 2,
          usersLiked: 'Users who liked3',
          usersDisliked: 'Users who disliked3'
        }
    ];
    res.status(200).json(sauces);
});

module.exports = app;