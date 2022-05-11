const { Router } = require('express');
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/Sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, sauceCtrl.createSauce);

//get one object from Sauces
router.get('/:id', sauceCtrl.getSauce);

  //using get to display sauce array in json
router.get('/', sauceCtrl.getAllSauces);
  
  //modify an object
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
  
  //delete an object
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;