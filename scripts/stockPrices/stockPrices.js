define(["yahoo/yahoo", "yahoo/stock", "knockout"], function(yahoo, Stock, ko) {
	var StockPrices = function() {
		this.stocks = ko.observableArray([]); // fix for the first time
		this.symbols = ["WDI.DE", "VT9.DE", "MYRK.F", "DPW.DE"];
	};
	
	StockPrices.prototype.load = function() {
		var deferreds = yahoo.loadPrices(this.symbols);
		
		for(var i = 0; i < deferreds.length; i++) {
			var deferred = deferreds[i];
			deferred.done(function(data) {
				var underlying = this.stocks();
				var newStock = new Stock(data);
				var oldStock = _.find(underlying, function(x) {
					x = x();
					return x.symbol === newStock.symbol;
				});
				
				if(oldStock) {
					oldStock().merge.call(oldStock(), newStock);
				}else{
					underlying.push(ko.observable(newStock));
				}
				
				underlying.sort(function(a,b){return a().compareTo(b());});
				
				this.stocks.valueHasMutated();
			}.bind(this));
		}

	};
	
	return new StockPrices();
});