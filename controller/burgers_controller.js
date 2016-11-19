// this is the burgers_controller.js file which is creatin gall the routes doe the users

var models = require('../models');
var express = require('express');
var router = express.Router();

/* this is a home route this route is redirected to burgers route where all the
 burgers will be displayed*/
router.get('/', function(req, res) {
  res.redirect('/burgers')
})

// this route dispays all the burgers

router.get('/burgers', function(req, res) {
  models.burgers.findAll({
    attributes: ['id', 'burger_name', 'devoured'],
  }).then(function(result) {
    res.render('burgers/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      burgers: result
    })
  })
})

// this is the route which is used to add a burger if user wants to
router.post('/burgers/add', function(req, res) {
  console.log('add', req.body.name);
  return models.burgers.create({
    burger_name: req.body.name
  }).then(function() {
    res.redirect('/burgers')
  })
})

/* this is a route which when user click on devoured button placed the burger in the
in the devoured section
*/
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

// exporting router will export all the routes to the server file
module.exports = router