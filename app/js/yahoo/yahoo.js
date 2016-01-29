define(["./api/api"], function(api) {
	var Yahoo = function() {

	};
	
	Yahoo.prototype.loadPrices = function(symbols) {
		return $.map(symbols, function(symbol) {
			return this.loadPrice(symbol);
		}.bind(this));
	};
	
	Yahoo.prototype.loadPrice = function(symbol) {
		return loadSymbol(symbol);
	};

	Yahoo.prototype.loadToday = function(symbol) {
		return api.loadIntraday(symbol);
	};

	Yahoo.prototype.loadTodays = function(symbols) {
		return $.map(symbols, function(s) {
			return this.loadToday(s);
		}.bind(this));
	};

	var loadSymbol = function(symbol) {
		return api.load(symbol);
	};
	
	return new Yahoo();
});