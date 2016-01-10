define(["scripts/knockout"], function(ko) {
    ko.components.register("baseConfiguration", {
        viewModel: { require: "baseConfiguration" },
        template: { require: "text!baseConfiguration.html" }
    });

    ko.components.register("configRow", {
        viewModel: { require: "configuration/configRow/configRow" },
        template: { require: "text!configuration/configRow/configRow.html" }
    });
});