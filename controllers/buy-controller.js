const market = require('yahoo-finance')

function buy(req, res, stock) {
	req.user.customData.portfolio.push({name: stock, priceBought: })
	req.user.customData.save()
	res.render('portfolio', {user: req.user, portfolio: req.user.customData.portfolio})
	console.log('Buying')
}

module.exports.buyStock = function(req, res) {
	buy(req, res, req.body.buy)
	let stockSymbol = req.body.quote

  // Check that string is not only whitespace
  if (stockSymbol.trim() == '') displayError(req, res)

  // If the symbol is valid lookup price
else {
	market.snapshot({
		symbol: stockSymbol
	},
	function (err, snapshot) {
		if (err) {
			displayError(req, res)
		}
		else {
			displayQuote(req, res, snapshot.name, snapshot.lastTradePriceOnly)
		}
	})
}
}