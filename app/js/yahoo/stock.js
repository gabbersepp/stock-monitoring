define(["scripts/moment"], function(moment) {
	var Stock = function(data) {
		var splits = data.replace(/\"/g, "").split(",");
		this.name = splits[4];
		this.previousClose = splits[3];
		this.currentDayStart;
		this.boerse;
		this.lastPrice = ko.observable(splits[2]);
		this.priceBeforeLastPrice;
		this.time = ko.observable(moment(splits[1] + " " + splits[0] + "a", "MM/DD/YYYY HH:mma"));
		this.symbol = splits[5].trim();
		
		this.difference = ko.observable(Math.round((this.lastPrice() - this.previousClose) * 100) / 100);
		this.differenceClass = ko.observable(this.difference() < 0 ? "diff diffMinus" : "diff diffPlus");
		this.formattedTime = ko.observable(this.time().format("HH:mm"));
		
		this.oldValues = {
			lastPrice: undefined
		};
		
		this.hasChanged = ko.observable(false);
		
		this.lastPrice.subscribe(function() {
			this.hasChanged(this.oldValues.lastPrice && this.oldValues.lastPrice !== this.lastPrice());
		}.bind(this));
	};
	
	Stock.prototype.notifyChangeRowClass = function() {
		return this.difference() < 0 ? "rowChangedNegativ" : "rowChangedPlus";
	};
	
	Stock.prototype.merge = function(oldStock) {
		this.oldValues.lastPrice = this.lastPrice();
		
		this.lastPrice(oldStock.lastPrice());
		this.time(oldStock.time());
		this.difference(oldStock.difference());
		this.differenceClass(oldStock.differenceClass());
		this.formattedTime(oldStock.formattedTime());
	};
	
	Stock.prototype.compareTo = function(that) {
		var replaceFn = function(x) {
			return x.replace(/[0-9\s]*/g, '');
		};
		
		return replaceFn(this.name) < replaceFn(that.name) ? -1 : 1;
	};
	
	return Stock;
});