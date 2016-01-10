define(function() {
    "use strict";

   var Datacontext = function() { };

    Datacontext.prototype.save = function(identifier, entity) {
        return get(getUrl("config/save.php"), { entity: entity, identifier: identifier });
    };

    Datacontext.prototype.delete = function(identifier, entity) {
        return get(getUrl("config/delete.php"), { entity: entity, identifier: identifier });
    };

    Datacontext.prototype.list = function(entity) {
        return get(getUrl("config/list.php"), { entity: entity });
    };

    function get(url, params) {
        return $.get(url, params);
    }

    function getUrl(path) {
        return window.config.apiUrl + path;
    }

    return new Datacontext();
});