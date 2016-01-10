define(["./finanznachrichten/finanznachrichten", "scripts/knockout", "../../api/js/datacontext.js"], function(finanznachrichten, ko, datacontext) {
	var max = 2;
	var Finanznachrichten = function() {
		this.newsPerStock = ko.observableArray([]);
		this.ids = [];
		this.loadIds();
	};
	
	Finanznachrichten.prototype.load = function() {
		if(this.ids.length > 0) {
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
		}else{
			this.loadIds();
		}
	};

	Finanznachrichten.prototype.loadIds = function() {
		datacontext.list("news").done(function(data) {
			var parsed = JSON.parse(data);
			var ar = [];
			$.each(parsed, function(index, entry) {
				ar.push(entry.identifier);
			}.bind(this));
			this.ids = ar;
			this.load();
		}.bind(this));
	};

	return new Finanznachrichten();
});