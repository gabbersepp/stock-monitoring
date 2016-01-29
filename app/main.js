requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '../main',
        scripts: '../../scripts',
        text: "../../scripts/text"//,
        //api: '../../api' does not work??
    }
});

require(["scripts/knockout", "utils/refresh", "stockPrices/stockPrices", "forum/forum", "nachrichten/nachrichten", "chart/charts", "components", "../../config"], function(ko, refresh, stockPrices, forum, news, charts) {
	window.ko = window.ko || ko;
	
	require(["customBindings"], function() {
		ko.applyBindings(this, $("body")[0]);

		stockPrices.init({
			afterPointLoaded: charts.refresh.bind(charts),
			afterSymbolsLoaded: charts.load.bind(charts)
		});

		refresh.refresh(stockPrices.load.bind(stockPrices), 70);
		refresh.refresh(news.load.bind(news), 60*15);
		refresh.refresh(forum.load.bind(forum), 60*15);
	});
});