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
                
                    
                //// ---------------------------------------    Single Call Code
                //                        app.GL.Post("GL.Security.Login", this.model, this.success);

                //var batcher = new app.GL.BatchPost();

                //// ---------------------------------------    BATCH Call Code
                //batcher.Add("GL.Security.Login", self.parentView.model, this.success);
                //batcher.Add("GL.Security.Bogus", 24);
                //batcher.Post();

                //// ---------------------------------------    No Call Code
                this.success({"UserID":"Person1","UserName":"Saqib Shakil","IsLoggedIn":true,"LoginToken":"af29ded0-83c7-4570-9356-d4d1c7b29978","AvailableModules":[{"ModName":"GMC","IsDefault":false},{"ModName":"Connect","IsDefault":true}], "Message": null, "UniqueIdentifier": "842" });
                    
            };

            self.success = function (response) {
                self.controller.loggedin(response);
            };
            
        };




    });

});