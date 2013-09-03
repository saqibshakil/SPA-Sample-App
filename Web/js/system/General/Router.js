define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
],

function (namespace, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("General", function (General, app, Backbone, Marionette, $, _) {
        General.Router = Backbone.Router.extend({

            initialize: function (options) {
                this.options = options;
            },

            routes: {
                ":module/*subroute": "loadModule",
                "*else": "gotoHome"

            },

            /*
            * Change the active element in the topbar 
            */

            loadModule: function (module, subroute) {
                require(['../modules/' + module + '/Main'], function (mod) {
                    if (mod == null) {
                        alert("Module " + module + " is not installed. Please check Back with the Administrator");
                        return;
                    }
                    mod._isInitialized = false;
                    mod.start();

                    var router = eval('app.' + module + 'Router');
                    if (router == null)
                        router = new mod.Router(module + '/', { controller: mod.Controller});

                });
            },

            gotoHome: function () {
                app.content.show(new General.Views.MainView());
            }

        });

        


    });

});