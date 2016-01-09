define(["./finanznachrichten/finanznachrichten", "scripts/knockout"], function(finanznachrichten, ko) {
	var max = 2;
	var Finanznachrichten = function() {
		this.newsPerStock = ko.observableArray([]);
		this.ids = ["wirecard-ag-aktien-de0007472060", "vtg-ag-aktien-de000vtg9999", "myhammer-holding-ag-aktien-de000a11qww6", "deutsche-post-ag-aktien-de0005552004"];
	};
	
	Finanznachrichten.prototype.load = function() {
		var deferreds = finanznachrichten.loadMulti(this.ids);
		
		for(var i = 0; i < deferreds.length; i++) {
			var deferred = deferreds[i];
			deferred.done(function(data) {
				var underlying = this.newsPerStock();
				var entries = finanznachrichten.fromXml(data);
				var news = [];
				var stockName = entries.stock;
				var newsForStock = _.find(underlying, {stockName: stockName});
				
				for(var i = 0; i < entries.news.length && i < max; i++) {
					if(newsForStock) {
						var oldNews = newsForStock.news[i];
						oldNews.merge.call(oldNews, entries.news[i]);
					}else{
						news.push(entries.news[i]);
					}
				}
					
				if(!newsForStock) {
					this.newsPerStock.push({stockName: stockName, news: news});
				}

			}.bind(this));
		}

	};
	
	return new Finanznachrichten();
});