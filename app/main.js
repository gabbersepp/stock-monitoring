requirejs.config({
    baseUrl: 'scripts',
    paths: {
        app: '../main'
    }
});

require(["knockout", "stockPrices/stockPrices", "nachrichten/nachrichten", "utils/refresh",
	"footer/footer", "forum/forum"], function(ko, stockPrices, nachrichten, refresh, footer, forum) {
	window.ko = window.ko || ko;
	
	require(["customBindings"], function() {
		var $top_left = $("#top_left");
		var $top_right = $("#top_right");
		var $bottom = $("#bottom");
		var $footer = $("#footer");
		
		ko.applyBindings(stockPrices, $top_left[0]);
		ko.applyBindings(nachrichten, $bottom[0]);
		
		ko.applyBindings(forum, $top_right[0]);
		//ko.applyBindings(stockPrices, $bottom[0]);
		ko.applyBindings(footer, $footer[0]);
		
		refresh.refresh(stockPrices.load.bind(stockPrices), 70);
		refresh.refresh(nachrichten.load.bind(nachrichten), 60*15);
		refresh.refresh(forum.load.bind(forum), 60*15);
		
	});
});