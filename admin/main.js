requirejs.config({
    baseUrl: 'js',
    paths: {
        app: '../main',
		scripts: '../../scripts',
		text: "../../scripts/text",
        api: '../../api'
    }
});

require(["scripts/knockout", "components", "../../config"], function(ko) {
	window.ko = window.ko || ko;

	ko.applyBindings(this, $("body")[0]);
});