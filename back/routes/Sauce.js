const { Router } = require('express');
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/Sauce');


router.post('/', sauceCtrl.createSauce);

//get one object from Sauces
router.get('/:id', sauceCtrl.getSauce);

  //using get to display sauce array in json
router.get('/', sauceCtrl.getAllSauces);
  
  //modify an object
router.put('/:id', sauceCtrl.modifySauce);
  
  //delete an object
router.delete('/:id', sauceCtrl.deleteSauce);

module.exports = router;