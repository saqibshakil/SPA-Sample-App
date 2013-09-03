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
],

function (namespace, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("GMC", function (GMC, app, Backbone, Marionette, $, _, namespace) {

        app.addInitializer(function (options) {

        });


    });
    app.GMC.startWithParent = false;
    
    return app.GMC;
});
   