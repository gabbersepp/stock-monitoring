define(function() {
	return {
		refresh: function(func, timeout) {
			var fn = function() {
				func();
				setTimeout(fn, timeout*1000);
			};
			
			fn();
		}
	};
});