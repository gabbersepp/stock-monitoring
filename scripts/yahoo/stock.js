define(["moment"], function(moment) {
	var Stock = function(data) {
		var splits = data.replace(/\"/g, "").split(",");
		this.name = splits[4];
		this.previousClose = splits[3];
		this.currentDayStart;
		this.boerse;
		this.lastPrice = splits[2];
		this.priceBeforeLastPrice;
		this.time = moment(splits[1] + " " + splits[0] + "a", "MM/DD/YYYY HH:mma");
		
		this.difference = Math.round((this.lastPrice - this.previousClose) * 100) / 100;
		this.differenceClass = this.difference < 0 ? "diff diffMinus" : "diff diffPlus";
		this.formattedTime = this.time.format("HH:mm");
	};
	
	return Stock;
});