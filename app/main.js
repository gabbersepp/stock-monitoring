requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '../main',
        scripts: '../../scripts',
        text: "../../scripts/text"//,
        //api: '../../api' does not work??
    }
});

require(["scripts/knockout", "utils/refresh", "stockPrices/stockPrices", "forum/forum", "nachrichten/nachrichten", "components", "../../config", "scripts/simplyScroll"], function(ko, refresh, stockPrices, forum, news) {
	window.ko = window.ko || ko;
	
	require(["customBindings"], function() {
		ko.applyBindings(this, $("body")[0]);

		refresh.refresh(stockPrices.load.bind(stockPrices), 70);
		refresh.refresh(news.load.bind(news), 60*15);
		refresh.refresh(forum.load.bind(forum), 60*15);

		setTimeout(function() {
			$(".scrollable").simplyScroll({ orientation: "vertical", frameRate: 10, speed: 1, customClass: "custom-scroll" });
		}, 5000);
	});
});