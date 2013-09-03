define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "text!system/General/templates/main.htm",
],

function (namespace, Backbone, Marionette, $, _,mainTemplate) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("General", function (General, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        General.Views = {};

        General.Views.MainView = Marionette.CompositeView.extend({
            template: mainTemplate,
            className: "row-fluid"
        });

    });

});