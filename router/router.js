const express = require('express')
const router = express.Router()
const stormpath = require('express-stormpath')
const stockController = require('../controllers/stock-controller')

router.get('/', stormpath.getUser, (req, res) => res.render('index', {user: req.user}))

router.get('/portfolio', stormpath.getUser, (req, res) => res.render('portfolio', {user: req.user, portfolio: req.user.customData.portfolio}))

router.post('/buy', stormpath.getUser, (req, res) => stockController.buyStock(req, res))
router.get('/buy', stormpath.getUser, (req, res) => res.render('buy', {user: req.user}))

router.get('/sell', stormpath.getUser, (req, res) => res.render('sell', {user: req.user}))

router.post('/quote', stormpath.getUser, (req, res) => stockController.getQuote(req, res))
router.get('/quote', stormpath.getUser, (req, res) => res.render('quote', {user: req.user}))


router.get('*', stormpath.getUser, (req,res) => res.render('error', {user: req.user}))

module.exports = router