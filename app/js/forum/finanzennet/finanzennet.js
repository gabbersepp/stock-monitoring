define(["./post"], function(Post) {
	var FinanzenForum = function() {};
	
	FinanzenForum.prototype.loadSingleThread = function(id) {
		return $.get("http://biehler.morloc.de/signage/scripts/forum/finanzennet/api.php", {id: id});
	};
	
	FinanzenForum.prototype.loadMultipleThreads = function(ids) {
		return $.map(ids, function(id) {
			return this.loadSingleThread(id);
		}.bind(this));
	};
	
	FinanzenForum.prototype.fromXml = function(text) {
		var $xml = $($.parseXML(text));
		var feedTitleText = $($xml.find("title")[0]).text().replace("finanzen.net Feed: Forum-", "");
		var entries = $.map($xml.find("item"), function(item) {
			item = $(item);
			var titleWithDate = item.find("title").text();
			var title = titleWithDate.substr(titleWithDate.indexOf("Uhr:") + 5);
			var description = item.find("description").text();
			var link = item.find("link").text();
			var pubDate = titleWithDate.substr(0, titleWithDate.indexOf("Uhr:"));
			return new Post(title, description, link, pubDate);
		}.bind(this));
		
		return {
			posts: entries,
			stock: feedTitleText
		};
	};
	
	return new FinanzenForum();
});