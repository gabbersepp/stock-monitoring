define(function() {
	var Post = function(title, desc, link, date) {
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
	
	Post.prototype.notifyChangeRowClass = function() {
		return "postRowChanged";
	};
	
	Post.prototype.merge = function(that) {
		this.oldValues.date = this.date();
		this.date(that.date() + Date.now());
		this.title(that.title());
		this.description(that.description());
		this.link(that.link());
	};
	
	return Post;
});