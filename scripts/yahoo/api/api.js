define(function() {
	var url = "http://biehler.morloc.de/signage/scripts/yahoo/api/api.php";
	
	var Api = function() {
		
	};
	
	Api.prototype.load = function(symbol) {
		//last grade time, last trade date, last trade without time, previous close, name
		return $.get(url, {f: "t1d1l1pn", s: symbol});
	};
	
	return new Api();
});