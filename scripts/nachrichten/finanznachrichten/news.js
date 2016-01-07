define(function() {
	var News = function(title, desc, link, date) {
		this.title = ko.observable(title);
		this.description = ko.observable(desc);
		this.link = ko.observable(link);
		this.date = ko.observable(date);
		
		this.oldValues = {
			date: undefined
		};
		
		this.hasChanged = ko.observable(false);
		
		this.date.subscribe(function() {
			this.hasChanged(this.oldValues.date && this.oldValues.date !== this.date());
		}.bind(this));
	};
	
	News.prototype.notifyChangeRowClass = function() {
		return "newsRowChanged";
	};
	
	News.prototype.merge = function(that) {
		this.oldValues.date = this.date();
		this.date(that.date());
		this.title(that.title());
		this.description(that.description());
		this.link(that.link());
	};
	
	return News;
});