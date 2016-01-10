define(["scripts/knockout"], function(ko) {
    ko.components.register("baseConfiguration", {
        viewModel: { require: "baseConfiguration" },
        template: { require: "text!baseConfiguration.html" }
    });
});