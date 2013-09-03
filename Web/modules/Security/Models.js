define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "kendoweb"
],

function (namespace, Backbone, Marionette, $, _, kendo) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Security", function (Security, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        Security.Models = {};

        Security.Models.Module = Backbone.Model.extend({
            ModName: "",
            IsDefault: false,
            IsSelected: false
        });

        Security.Models.Modules = Backbone.Collection.extend({
            model: Security.Models.Module
        });

        Security.Models.LoggedInUser = Backbone.Model.extend({
            UserID: "",
            UserName: "",
            IsLoggedIn: false,
            LoginToken: ""
        });

        Security.Models.LoginModel = Backbone.Model.extend({
            username: "",
            password: ""
        });

        Security.Models.loggedInUser = new Security.Models.LoggedInUser();

        //Security.Models.LoginModel = kendo.data.Model.define({
        //    id: "username", // the identifier is the "id" field (declared below)
        //    fields: {
        //        username: {
        //            type: "string", // the field is a string
        //            validation: { // validation rules
        //                required: true // the field is required
        //            },
        //            defaultValue: "" // default field value
        //        },

        //        password: {
        //            type: "string", // the field is a string
        //            validation: { // validation rules
        //                required: true // the field is required
        //            },
        //            defaultValue: "" // default field value
        //        }
        //    }
        //});


    });

});