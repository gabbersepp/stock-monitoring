define(["./point"], function(Point) {

    var Chart = function(symbol, points) {
        this.symbol = symbol;
        this.points = points;
        this.$view = null;
    };

    Chart.prototype.addPoint = function(time, price) {
        var higherExists = _.find(this.points, function(p) {
            return p.time > time;
        });
        if(!higherExists) {
            var point = new Point(time, price);
            this.points.push(point);
            var shift = this.points.length > 200;
            this.$view.highcharts().series[0].addPoint([time, price], true, shift);
        }
    };

    Chart.prototype.attached = function(view) {
        this.$view = $(view);
        this.init();
    };

    Chart.prototype.init = function() {
        // create the chart

        var data = _.map(this.points, function(p) {
            return [p.time, p.price];
        });

        var a = [];

        for(var i = 0; i < data.length; i++) {
            a[i] = [data[i][0], data[i][1]];
        }

        this.$view.highcharts('StockChart', {
            title : {
                text : this.symbol
            },

            series : [{
                name : 'AAPL',
                data : a,
                tooltip: {
                    valueDecimals: 2
                }
            }],

            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            rangeSelector:{
                enabled: false
            }
        });
    };


    return Chart;

});
