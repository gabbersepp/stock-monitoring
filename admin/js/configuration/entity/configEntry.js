define(function() {
    var ConfigEntry = function(value) {
        this.value = ko.observable(value);
        this.hasValue = ko.pureComputed(function() {
            return this.value() !== undefined && this.value() !== "";
        }.bind(this));
    } ;

    return ConfigEntry;
});