define(["yahoo/yahoo", "yahoo/stock", "knockout"], function(yahoo, Stock, ko) {
	var StockPrices = function() {
		this.stocks = ko.observableArray([]); // fix for the first time
		this.symbols = ["WDI.DE", "VT9.DE", "MYRK.F", "DPW.DE"];
	};
	
	StockPrices.prototype.load = function() {
		this.stocks([]);
		var deferreds = yahoo.loadPrices(this.symbols);
		
		for(var i = 0; i < deferreds.length; i++) {
			var deferred = deferreds[i];
			deferred.done(function(data) {
				this.stocks.push(new Stock(data));
			}.bind(this));
		}

	};
	
	return new StockPrices();
});