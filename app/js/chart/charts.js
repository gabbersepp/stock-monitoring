define(['yahoo/yahoo', "./chart", "scripts/knockout", "./point"], function(yahoo, Chart, ko, Point) {
    var Charts = function(){
        this.charts = ko.observableArray();
        this.symbols = ko.observableArray();
    };

    Charts.prototype.load = function(symbols) {
        // should be called once after loading of the page
        // every new point can be added through the callback of stockPrices

        _.each(yahoo.loadTodays(symbols), function(def) {
            def.done(function (data) {
                var splits = data.split("\n");
                var outerIndex = 30;

                // find symbol
                var symbol = _.find(splits, function(s) {
                    return s.indexOf("ticker") > -1;
                });

                symbol = symbol.replace("ticker:", "").trim();

                // remove useless entries
                splits.splice(0, outerIndex + 1);

                // now parse
                var points = _.chain(splits).map(function (row) {
                    var splits = row.split(",");
                    return new Point(parseInt(splits[0]) * 1000, parseFloat(splits[1]), parseFloat(splits[5]));
                }).filter(function(x) {
                    return !isNaN(x.price) && !isNaN(x.time);
                })._wrapped;

                this.charts.push(new Chart(symbol.toUpperCase(), points));
            }.bind(this));
        }.bind(this));
    };

    Charts.prototype.refresh = function(stock) {
        var chart = _.find(this.charts(), function(c) {
            return c.symbol === stock.symbol;
        });

        if (chart) {
            chart.addPoint.call(chart, stock.time().unix()*1000, parseFloat(stock.lastPrice()));
        } else {
            console.error("chart for stock " + stock.symbol + " not found");
        }
    };

    return new Charts();
});