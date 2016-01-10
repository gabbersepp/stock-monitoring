define(function() {
	var url = window.config.adapterHost + "app/js/yahoo/api/api.php";
	
	var Api = function() {
		
	};
	
	Api.prototype.load = function(symbol) {
		//last grade time, last trade date, last trade without time, previous close, name
		return $.get(url, {f: "t1d1l1pns", s: symbol});
	};
	
	return new Api();
});