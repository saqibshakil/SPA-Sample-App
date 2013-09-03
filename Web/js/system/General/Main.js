define([
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "system/General/Models",
    "system/General/Views",
    "system/General/Router"
],

function (namespace, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("General", function (General, app, Backbone, Marionette, $, _, namespace) {
        this.startWithParent = true;

        app.addInitializer(function (options) {
            require(["../modules/Security/Main"], function (security) {
                security._isInitialized = false;
                security.start();
            });
            app.GL._isInitialized = false;
            app.GL.start();
            app.Router = new General.Router({ options: {} });
        });


    });


    return app.General;
});
   