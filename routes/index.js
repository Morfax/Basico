var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../schemas/account');

// Area de rutas

// Inicio
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

// Rutas de Usuarios
router.get('/register', function(req, res) {
  if (req.user) {
    if (req.user.username == "administrador") {
      res.render('register', {user: req.user});
    }else {
      res.redirect('/');
    }
  }else {
    res.redirect('/');
  }
});

router.post('/register', function(req, res, next) {
    if (req.user) {
      if (req.user.username == "administrador") {
        Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
          if (err) {
            console.log('error while user register!', err);
            return next(err);
          }
          res.redirect('/');
        });
      }else {
        res.redirect('/');
      }
    }else {
      res.redirect('/');
    }
});

router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Rutas Nuevas

module.exports = router;
