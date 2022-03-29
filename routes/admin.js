var express = require('express');
var router = express.Router();

var uid2 = require('uid2')
var bcrypt = require('bcrypt');

var adminModel = require('../models/admins');

// SIGN UP
router.post('/sign-up', async function (req, res, next) {

  var error = [];
  var result = false;
  var saveAdmin = null;
  var token = null;

  var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!(emailRegEx.test(req.body.email))) {
    error.push('format d\'email incorrect')
  }

  const data = await adminModel.findOne({
    email: req.body.email
  })

  if (data != null) {
    error.push('utilisateur déjà présent')
  }

  if (req.body.lastName == ''
    || req.body.firstName == ''
    || req.body.email == ''
    || req.body.password == ''
    || req.body.telephone == ''
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.password, 10);
    var newAdmin = new adminModel({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hash,
      telephone: req.body.telephone,
      token: uid2(32)
    })

    saveAdmin = await newAdmin.save()

    if (saveAdmin) {
      result = true
      token = saveAdmin.token
    }
  }

  res.json({ result, saveAdmin, error, token })
})

// SIGN IN
router.post('/sign-in', async function (req, res, next) {

  var result = false
  var admin = null
  var error = []
  var token = null

  if (req.body.email == ''
    || req.body.password == ''
  ) {
    error.push('Certains champs sont vides !')
  }

  if (error.length == 0) {
    admin = await adminModel.findOne({
      email: req.body.email,
    })

    if (admin) {
      if (bcrypt.compareSync(req.body.password, admin.password)) {
        result = true
        token = uid2(32)
        await adminModel.updateOne({ token: admin.token }, { token: token })
      } else {
        result = false
        error.push('Le mot de passe est incorrect.')
      }

    } else {
      error.push('Cet email est inconnu.')
    }
  }

  res.json({ result, admin, error, token })

})

module.exports = router;