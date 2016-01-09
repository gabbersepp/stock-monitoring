requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '../main',
		scripts: '../../scripts',
		text: "../../scripts/text"
    }
});

require(["scripts/knockout", "utils/refresh", "stockPrices/stockPrices", "forum/forum", "nachrichten/nachrichten", "components"], function(ko, refresh, stockPrices, forum, news) {
	window.ko = window.ko || ko;
	
	require(["customBindings"], function() {
		ko.applyBindings(this, $("body")[0]);

		refresh.refresh(stockPrices.load.bind(stockPrices), 70);
		refresh.refresh(news.load.bind(news), 60*15);
		refresh.refresh(forum.load.bind(forum), 60*15);

		//refresh.refresh(nachrichten.load.bind(nachrichten), 60*15);
		//refresh.refresh(forum.load.bind(forum), 60*15);
		
	});
});