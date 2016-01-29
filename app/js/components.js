define(["scripts/knockout", "stockPrices/stockPrices", "nachrichten/nachrichten", "forum/forum", "chart/charts"], function(ko, stockPrices, nachrichten, forum, charts) {
    ko.components.register('stockPrices', {
       viewModel: { instance: stockPrices },
        template: { require: "text!stockPrices/stockPrices.html" }
    });

    ko.components.register("news", {
       viewModel: { instance: nachrichten },
        template: { require: "text!nachrichten/nachrichten.html" }
    });

    ko.components.register("forum", {
       viewModel: { instance: forum },
        template: { require: "text!forum/forum.html" }
    });

    ko.components.register("charts", {
        viewModel: { instance: charts },
        template: { require: "text!chart/charts.html" }
    });
});