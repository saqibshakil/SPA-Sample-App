define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "knockout",
    "knockback",
    "./Models"
],

function (namespace, Backbone, Marionette, $, _, ko, kb) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Security", function (Security, app, Backbone, Marionette, $, _) {
        Security.ViewModels = {};

        Security.ViewModels.LoginViewModel = function (model) {
            var self = this;
            self.rememberMe = ko.observable(false);

            self.model = kb.viewModel(model);

            self.signIn = function () {
                
                    

                //                        app.GL.Post("GL.Security.Login", this.model, this.success);

                var batcher = new app.GL.BatchPost();
                
                batcher.Add("GL.Security.Login", self.parentView.model, this.success);
                batcher.Add("GL.Security.Bogus", 24);
                batcher.Post();

                    
            };

            self.success = function (response) {
                alert("Authentication Token :" + response.LoginToken);
                self.controller.loggedin(response);
            };
            
        };




    });

});