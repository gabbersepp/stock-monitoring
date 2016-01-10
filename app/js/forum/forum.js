define(["./finanzennet/finanzennet", "scripts/knockout", "/api/js/datacontext.js"], function(forum, ko, datacontext) {
	var max = 1;
	var Forum = function() {
		this.postsPerStock = ko.observableArray([]);
		this.ids = [];
		this.loadIds();
	};
	
	Forum.prototype.load = function() {
		if(this.ids.length > 0) {
			var deferreds = forum.loadMultipleThreads(this.ids);

			for(var i = 0; i < deferreds.length; i++) {
				var deferred = deferreds[i];
				deferred.done(function(data) {
					var underlying = this.postsPerStock();
					var entries = forum.fromXml(data);
					var posts = [];
					var stockName = entries.stock;
					var postsForStock = _.find(underlying, {stockName: stockName});

					for(var i = 0; i < entries.posts.length && i < max; i++) {
						if(postsForStock) {
							var oldNews = postsForStock.posts[i];
							oldNews.merge.call(oldNews, entries.posts[i]);
						}else{
							posts.push(entries.posts[i]);
						}
					}

					if(!postsForStock) {
						this.postsPerStock.push({stockName: stockName, posts: posts});
					}

				}.bind(this));
			}
		}else{
			this.loadIds();
		}
	};

	Forum.prototype.loadIds = function() {
		datacontext.list("forum").done(function(data) {
			var parsed = JSON.parse(data);
			var ar = [];
			$.each(parsed, function(index, entry) {
				ar.push(entry.identifier);
			}.bind(this));
			this.ids = ar;
			this.load();
		}.bind(this));
	};

	return new Forum();
});