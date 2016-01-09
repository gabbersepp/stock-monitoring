define(["./finanzennet/finanzennet", "scripts/knockout"], function(forum, ko) {
	var max = 1;
	var Forum = function() {
		this.postsPerStock = ko.observableArray([]);
		this.ids = [497990, 293936, 392706, 241302];
	};
	
	Forum.prototype.load = function() {
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

	};
	
	return new Forum();
});