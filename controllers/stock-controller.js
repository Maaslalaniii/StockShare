const market = require('yahoo-finance')

// Renders an error page
function displayError(req, res, backRoute) {
  res.render('error', {
    user: req.user,
    message: 'Stock was not found',
    details: 'Sorry, the stock you searched for was invalid and could not be retrieved. Please try again with a valid stock symbol',
    back: '/' + backRoute
  })
}

// Renders the quote page with the name and price of the stock
function displayQuote(req, res, stockName, stockPrice) {
  res.render('quote', {user: req.user, stockName, stockPrice})
}

// Purchase a stock and save it to the users portfolio
function buy(req, res, symbol, stock, price) {
  req.user.customData.portfolio.push({symbol: symbol, name: stock, priceBought: price})
  req.user.customData.save()
  res.render('portfolio', {user: req.user, portfolio: req.user.customData.portfolio}) 
}

module.exports.buyStock = function (req, res) {
  let stockSymbol = req.body.buy

  // Check that string is not only whitespace
  if (stockSymbol.trim() == '') displayError(req, res)

  // If the symbol is valid lookup price
  else {
    market.snapshot({
      symbol: stockSymbol
    }, (err, snapshot) => {
      if (err) displayError(req, res)
      else buy(req, res, stockSymbol, snapshot.name, snapshot.lastTradePriceOnly)
    })
  }
}


module.exports.getQuote = function (req, res) {
  let stockSymbol = req.body.quote

  // Check that string is not only whitespace
  if (stockSymbol.trim() == '') displayError(req, res)

  // If the symbol is valid lookup price
  else {
    market.snapshot({
      symbol: stockSymbol
    }, (err, snapshot) => {
      if (err) displayError(req, res)
      else displayQuote(req, res, snapshot.name, snapshot.lastTradePriceOnly)
    })
  }
}