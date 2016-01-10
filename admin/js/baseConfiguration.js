define(["configuration/entity/configEntry", "api/js/datacontext"], function(ConfigEntry, datacontext) {
    var BaseConfiguration = function(params) {
        this.entity = params.entity;
        this.data = ko.observableArray();
        this.rowsToRender = ko.pureComputed(function(){
            var array = [new ConfigEntry("")];
            array.push.apply(array, this.data());
            return array;
        }.bind(this));

        this.load();
        // trigger first call of subscription
        this.data.valueHasMutated();
    };

    BaseConfiguration.prototype.delete = function(obj) {
        this.data.remove(obj);
        datacontext.delete(obj.value(), this.entity);
    };

    BaseConfiguration.prototype.add = function(identifier) {
        if(identifier.value() !== "") {
            this.data.push(identifier);
            datacontext.save(identifier.value(), this.entity);
        }
    };

    BaseConfiguration.prototype.load = function() {
        datacontext.list(this.entity).done(function(data) {
            var parsed = JSON.parse(data);
            $.each(parsed, function(index, entry) {
                this.data.push(new ConfigEntry(entry.identifier));
            }.bind(this));
        }.bind(this));
    };

    return BaseConfiguration;
});