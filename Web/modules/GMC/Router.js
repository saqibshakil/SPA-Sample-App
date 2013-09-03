define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "subroute",
    "routefilter"
],

function (namespace,  Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("GMC", function (GMC, app, Backbone, Marionette, $, _) {

        GMC.Controller = {


            home: function () {
                var view = new GMC.Views.MainView();
                app.content.show(view);
            }
        };

        GMC.Router = app.GL.ModuleRouter.extend(
        $.extend(true,
        {

            initialize: function (options) {
                this.options = options;
            },

            routes: {
                "Home": "home",
                "home": "home",
                "*else": "gotoHome"

            },

            beforeRoute: function (route) {
                //this.initializeLayout();
                return true;
            },
            /*
            * Change the active element in the topbar 
            */

            gotoHome: function (route) {
                alert(route);
            }

        }, GMC.Controller));




    });

});