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

function (namespace, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Security", function (Security, app, Backbone, Marionette, $, _) {
        Security.UserModules = null;

        Security.Controller = {
            returnAddress: "",


            loggedin: function (user) {
                Security.Models.loggedInUser = new Security.Models.LoggedInUser(user);

                var viewModel = new Security.ViewModels.LoginViewModel(Security.Models.loggedInUser);
                viewModel.controller = Security.Controller;
                var view = new Security.Views.UserLoggedInView({
                    model: Security.Models.loggedInUser,
                    viewModel: viewModel
                });
                app.security.show(view);

                if (this.returnAddress != "") {
                    _.each(user.AvailableModules, function (module) {
                        module.IsDefault = false;
                    });
                }

                var modules = new Security.Models.Modules(user.AvailableModules);
                Security.UserModules = modules;
                var moduleview = new Security.Views.Modules({ collection: modules });
                app.modules.show(moduleview);
                app.modal.close();
                if (this.returnAddress != "") {
                    this.navigate(this.returnAddress, true);
                }
            },

            login: function () {
                if (Security.Models.loggedInUser.get("LoginToken") != undefined && Security.Models.loggedInUser.get("LoginToken") != "")
                    return;

                var person = {
                    username: "Person1",
                    password: "password"
                };
                var model = new Security.Models.LoginModel(person);
                var view = new Security.Views.LoginView({
                    model: model
                });
                

                var viewModel = new Security.ViewModels.LoginViewModel(model);
                
                view.viewModel = viewModel;
                viewModel.controller = this;

                app.content.show(view);

            },

            loginwithcallback: function (route) {
                this.returnAddress = "/" + route;
                this.login();
            },


        };

        Security.Router = Backbone.SubRoute.extend(
        $.extend(true,
        {

            initialize: function (options) {
                this.options = options;
                _.bindAll(this, "login", "loginwithcallback","gotoHome");
            },

            routes: {
                "Login": "login",
                "login": "login",
                "Login/*route": "loginwithcallback",
                "login/*route": "loginwithcallback",
                "*else": "gotoHome"

            },

            before: function (route) {
                //this.initializeLayout();
                return true;
            },
            /*
            * Change the active element in the topbar 
            */

            gotoHome: function (route) {
                alert(route);
            }

        }, Security.Controller));




    });

});