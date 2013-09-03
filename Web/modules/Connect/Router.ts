declare var define: any;
define([
// Libs
	"namespace",
    "gl",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "subroute",
    "routefilter"
],

function (namespace, GL, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Connect", function (Connect, app, Backbone, Marionette, $, _) {

        Connect.Controller = {


            home: function () {
                var view = new Connect.Views.MainView();
                app.content.show(view);
            }
        };

        Connect.Router = app.GL.ModuleRouter.extend(
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

        }, Connect.Controller));




    });

});