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
    app.module("Security", function (Security, app, Backbone, Marionette, $, _, namespace) {

        app.addInitializer(function (options) {
            app.Security.User = app.Security.Models.loggedInUser;
            if (app.Security.User.IsLoggedIn == false) {
                app.security.show(new Security.Views.NoUserLoggedInView());
            }

            app.GL.GetLoginToken = function () {
                if (!(app.Security.Models.loggedInUser.get("LoginToken") != undefined && app.Security.Models.loggedInUser.get("LoginToken") != ""))
                    return "";
                else
                    return app.Security.Models.loggedInUser.get("LoginToken");
            }
        });


    });
    app.Security.startWithParent = false;

    return app.Security;
});
   