define([
    "namespace", 
    "gl", 
    "backbone", 
    "marionette", 
    "jquery", 
    "underscore", 
    "subroute", 
    "routefilter"
], function (namespace, GL, Backbone, Marionette, $, _) {
    var app = namespace.app;
    app.module("Connect", function (Connect, app, Backbone, Marionette, $, _) {
        Connect.Controller = {
            home: function () {
                var view = new Connect.Views.MainView();
                app.content.show(view);
            }
        };
        Connect.Router = app.GL.ModuleRouter.extend($.extend(true, {
            initialize: function (options) {
                this.options = options;
            },
            routes: {
                "Home": "home",
                "home": "home",
                "*else": "gotoHome"
            },
            beforeRoute: function (route) {
                return true;
            },
            gotoHome: function (route) {
                alert(route);
            }
        }, Connect.Controller));
    });
});
//@ sourceMappingURL=Router.js.map
