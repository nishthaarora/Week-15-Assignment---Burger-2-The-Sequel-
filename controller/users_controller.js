var bcrypt = require('bcryptjs');
var express = require('express');
var models = require('../models');
var router = express.Router();


router.get('/new', function(req, res) {
	res.render('users/new');
});

router.get('/sign-in', function(req, res) {
	res.render('users/sign-in');
});

router.get('/sign-out', function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	})
});

router.post('/login', function(req, res) {
	models.User.findOne({
		where: {
			email: req.body.email
		}
	}).then(function(user) {
		if (user === null) {
			res.redirect('/users/sign-in')
		}

		bcrypt.compare(req.body.password, user.password, function(err, result) {

			if (result === true) {
				req.session.logged_in = true;
				req.session.username = user.username;
				req.session.user_id = user.id;
				req.session.user_email = user.email;
				console.log(req.session.logged_in);
				console.log(req.session.username);
				console.log(req.session.user_id);
				console.log(req.session.user_email);

				res.redirect('/');
			} else {
				res.redirect('/users/sign-in')
			}

		})

	})
})

router.post('/create', function(req, res) {
	models.User.findAll({
		where: {
			email: req.body.email
		}
	}).then(function(users) {
		if (users.length > 0) {
			res.send('we already have an email or username for this account')
		} else {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					models.User.create({
						email: req.body.email,
						password: hash
					}).then(function(user) {
						req.session.logged_in = true;
						req.session.username = user.username;
						req.session.user_id = user.id;
						req.session.user_email = user.email;
						res.redirect('/')
					})
				});
			});
		}
	})
})


module.exports = router;