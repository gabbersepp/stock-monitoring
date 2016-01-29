define(function() {
	var url = window.config.adapterHost + "app/js/yahoo/api/api.php";
	
	var Api = function() {
		
	};
	
	Api.prototype.load = function(symbol) {
		//last grade time, last trade date, last trade without time, previous close, name
		return $.get(url, {c: "point", f: "t1d1l1pns", s: symbol});
	};

	Api.prototype.loadIntraday = function(symbol) {
		// http://chartapi.finance.yahoo.com/instrument/1.0/WDI.DE/chartdata;type=quote;range=1d/csv
		return $.get(url, {c: "intraday", s: symbol });
	};
	
	return new Api();
});