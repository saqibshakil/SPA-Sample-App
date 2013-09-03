declare var define: any;
define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "kendoweb",
    "./Models"
],

function (namespace, Backbone, Marionette, $, _, kendo) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Connect", function (Connect, app, Backbone, Marionette, $, _) {
        Connect.ViewModels = {};

       




    });

});