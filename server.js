// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const stormpath = require('express-stormpath')
const router = require('./router/router')

// Initialize express app
const app = express()

// View engine
app.set('view engine', 'hbs')

// Middleware
app.use(stormpath.init(app, {
	website: true,
	expand: {
		customData: true
	},
	web: {
		register: {
			autoLogin: true,
			nextUri: '/'
		}
	}
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(__dirname + '/assets'))

// Routes
app.use('/', router)

// Listen
app.on('stormpath.ready', () =>
	app.listen(process.env.PORT || 3000, () =>
		console.log('Listening...')))