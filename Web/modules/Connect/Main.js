define([
    "namespace", 
    "backbone", 
    "marionette", 
    "jquery", 
    "underscore", 
    "./Router", 
    "./Models", 
    "./ViewModels", 
    "./Views"
], function (namespace, Backbone, Marionette, $, _) {
    var app = namespace.app;
    app.module("Connect", function (Connect, app, Backbone, Marionette, $, _, namespace) {
        app.addInitializer(function (options) {
        });
    });
    app.Connect.startWithParent = false;
    return app.Connect;
});
//@ sourceMappingURL=Main.js.map
