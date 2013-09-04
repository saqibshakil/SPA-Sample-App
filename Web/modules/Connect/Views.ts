declare var define:any;
define([
// Libs
    "gl",
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",

    "text!./templates/main.htm",
    
],

function (GL, namespace, Backbone, Marionette, $, _, MainTemplate) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Connect", function (Connect, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        Connect.Views = {};
        


        Connect.Views.MainView = Marionette.ItemView.extend({
            template: MainTemplate

        });



    });


});