// this is the cats_controller.js file

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/burgers')
})

router.get('/burgers', function(req, res) {
  models.burgers.findAll({
    attributes: ['id', 'burger_name', 'devoured'],
    // include: [models.User]

  }).then(function(result) {
    // console.log('result');
    // var allBurgers = {
    //   burgers: result
    // }
    res.render('burgers/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      burgers: result
    })
  })
})

router.post('/burgers/add', function(req, res) {
  console.log('add', req.body.name);
  return models.burgers.create({
    burger_name: req.body.name
  }).then(function() {
    res.redirect('/burgers')
  })
})

router.put('/burgers/update/:id', function(req, res) {

    if(req.session.logged_in === true) {

  return models.burgers.update({
      devoured: req.body.devoured
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(function(result) {

      res.redirect('/burgers');
    })
  } else {
    res.redirect('/users/new');
  }
})


module.exports = router