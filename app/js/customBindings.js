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
	};

	ko.bindingHandlers.componentLoadCallback = {
		init: function (element, valueAccessor) {
			var value = ko.unwrap(valueAccessor());
			if (value) {
				value(element);
			}
		}
	};

	ko.bindingHandlers.shift = {
		init: function (element, valueAccessor) {
			var value = ko.unwrap(valueAccessor());
			var settings = ko.utils.extend({
				list: ko.observableArray(),
				time: 0
			}, value);
			var $e = $(element);

			var $scrollable = $e.find(".scrollable");
			var realHeight = $e[0].scrollHeight;
			var trimmed = $e[0].height;

			if(settings.list().length > 0) {
				var interval = setInterval(function() {
					if($e.find(":hover").length === 0) {
						var underlying = settings.list();
						var toShift = underlying.splice(0, 1);
						underlying.push(toShift[0]);
						settings.list.valueHasMutated();
					}
				}, settings.time);
				$(element).data("ko_shift_interval", interval);
			} else {

			}

			ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
				var interval = $e.data("ko_shift_interval");
				if (interval) {
					clearInterval(interval);
				}
				$e.removeData("ko_shift_interval");
			});
		},
		update: function(element, valueAccessor) {
			var $e = $(element);
			var interval = $e.data("ko_shift_interval");

			if (interval) {
				clearInterval(interval);
				$e.removeData("ko_shift_interval");
			}

			ko.bindingHandlers.shift.init(element, valueAccessor);
		}
	};
});