define(function() {
	ko.bindingHandlers.notifyChangeInRow = {
		update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var unwrappedValue = valueAccessor();
			var hasChanged = unwrappedValue.hasChanged;
			if(hasChanged()) {
				var $e = $(element);
				var classToProcess = unwrappedValue.cssClass;
				
				$e.addClass(classToProcess);
				setTimeout(function() {
					$e.removeClass(classToProcess);
					hasChanged(false);
				}, 600);
			}
		}
	}
});