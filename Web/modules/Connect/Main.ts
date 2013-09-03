declare var define:any;
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
    app.module("Connect", function (Connect, app, Backbone, Marionette, $, _, namespace) {

        app.addInitializer(function (options) {

        });


    });
    app.Connect.startWithParent = false;
    
    return app.Connect;
});
   