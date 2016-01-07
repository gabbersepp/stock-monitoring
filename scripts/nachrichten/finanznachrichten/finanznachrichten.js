define(["./entry"], function(Entity) {
	var Finanznachrichten = function() {};
	
	Finanznachrichten.prototype.loadSingle = function(rssIdentifier) {
		return $.get("http://biehler.morloc.de/signage/scripts/nachrichten/finanznachrichten/api.php", {id: rssIdentifier});
	};
	
	Finanznachrichten.prototype.loadMulti = function(rssIdentifiers) {
		return $.map(rssIdentifiers, function(id) {
			return this.loadSingle(id);
		}.bind(this));
	};
	
	Finanznachrichten.prototype.fromXml = function(text) {
		var $xml = $($.parseXML(text));
		var feedTitleText = $($xml.find("title")[0]).text().replace("FinanzNachrichten.de: Nachrichten zu ", "");
		var entries = $.map($xml.find("item"), function(item) {
			item = $(item);
			var title = item.find("title").text();
			var description = item.find("description").text();
			var link = item.find("link").text();
			return new Entity(title, description, link);
		}.bind(this));
		
		return {
			news: entries,
			stock: feedTitleText
		};
	};
	
	return new Finanznachrichten();
});