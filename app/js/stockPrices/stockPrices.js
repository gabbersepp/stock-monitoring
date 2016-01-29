define(["yahoo/yahoo", "yahoo/stock", "scripts/knockout", "../../api/js/datacontext.js"], function(yahoo, Stock, ko, datacontext) {
	var StockPrices = function() {
		this.stocks = ko.observableArray([]);
		this.symbols = [];

		this.afterPointLoaded = null;
		this.afterSymbolsLoaded = null;

	};

	StockPrices.prototype.init = function(settings) {
		settings = ko.utils.extend({
			afterPointLoaded: null,
			afterSymbolsLoaded: null
		}, settings);

		this.afterPointLoaded = settings.afterPointLoaded;
		this.afterSymbolsLoaded = settings.afterSymbolsLoaded;
	};

	StockPrices.prototype.load = function() {
		if(this.symbols.length > 0) {
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

					if (this.afterPointLoaded) {
						this.afterPointLoaded(newStock);
					}

					underlying.sort(function(a,b){return a().compareTo(b());});

					this.stocks.valueHasMutated();
				}.bind(this));
			}
		}else{
            this.loadSymbols();
        }
	};

	StockPrices.prototype.loadSymbols = function() {
		datacontext.list("stockPrices").done(function(data) {
			var parsed = JSON.parse(data);
			var ar = [];
			$.each(parsed, function(index, entry) {
				ar.push(entry.identifier);
			}.bind(this));
			this.symbols = ar;
            this.load();

			if(this.afterSymbolsLoaded) {
				this.afterSymbolsLoaded(_.clone(ar));
			}
		}.bind(this));
	};
	
	return new StockPrices();
});