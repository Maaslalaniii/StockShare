const express = require('express')
const router = express.Router()
const stormpath = require('express-stormpath')

router.get('/', stormpath.getUser, (req, res) => res.render('index', {user: req.user}))

router.get('/portfolio', stormpath.getUser, (req, res) => res.render('portfolio', {user: req.user}))

router.get('/buy', stormpath.getUser, (req, res) => res.render('buy', {user: req.user}))

router.get('/sell', stormpath.getUser, (req, res) => res.render('sell', {user: req.user}))

router.get('*', stormpath.getUser, (req,res) => res.render('error', {user: req.user}))

module.exports = router