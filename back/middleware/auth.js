const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = (req, res, next) => {
    try{
        //return array with bearer as first element and token as second element
        const token = req.headers.authorization.split(' ')[1];
        //decode the token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //taking userId from decodedToken
        const userId = decodedToken.userId;
        //assign userId as an attribute to request
        req.userId = userId;
        //verification that decoded token matches reques body token
        if (req.body.userId && req.body.userId !== userId){
            throw 'Identifiant utilisateur non valable !'
        }
        else{
            next();
        }
    } catch(error) {
        res.status(401).json({error: error | "Problème d'authentification !"})
    }
}