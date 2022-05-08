const express = require('express');

const app = express();
//setting up POST route
app.use(express.json());

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

//setting up GET route
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'fsjkshuijzb',
            title: 'Mon premier Pingu',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://pbs.twimg.com/media/ED9ur_HWwAEcYk3.jpg',
            price: 10,
            userId: 'madPingu',
        },
        {
            _id: 'dbuqjkiledjk',
            title: 'Mon deuxième Pingu',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://img-08.stickers.cloud/packs/710aa9ed-5ddd-4f68-82d0-6bfafe6a4960/webp/2f392421-3544-4148-9178-065417a1801e.webp',
            price: 11,
            userId: 'hungryPingu',
        }
    ];
    res.status(200).json(stuff);
});

module.exports = app;