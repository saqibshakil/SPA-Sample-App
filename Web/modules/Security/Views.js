define([
// Libs
    "gl",
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",

    "text!./templates/login.htm",
    "text!./templates/nouserloggedin.htm",
    "text!./templates/loginuser.htm",
    "text!./templates/modules.htm",
    "text!./templates/ModuleItemViewTemplate.htm",
    
],

function (GL, namespace, Backbone, Marionette, $, _, loginTemplate, noUserLoggedInTemplate, UserLoggedInTemplate, modulesTemplate, moduleItemViewTemplate) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Security", function (Security, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        Security.Views = {};



        Security.Views.LoginView = app.GL.Views.MvvmView.extend({
            template: loginTemplate

        });


        Security.Views.NoUserLoggedInView = Marionette.ItemView.extend({
            tagName: "li",
            template: noUserLoggedInTemplate

        });

        Security.Views.UserLoggedInView = Marionette.ItemView.extend({
            tagName: "li",
            className: 'dropdown',
            template: UserLoggedInTemplate

        });

        Security.Views.Module = Marionette.ItemView.extend({
            tagName: "li",
            template: moduleItemViewTemplate,
            initialize: function () {
                this.listenTo(this.model, "change:IsSelected", this.modelChanged);
            },
            events: {
                "click a": "onclick"
            },
            modelChanged: function (model, value) {
                if (value) {
                    this.$el.addClass("active");
                    this.trigger("selected", value);
                }
                else
                    this.$el.removeClass("active");


            },
            onRender: function () {
                if (this.model.get("IsDefault")) {
                    Backbone.Router.prototype.navigate(this.$("a")[0].hash,true);
                    //this.model.set("IsSelected", true);

                }
            },
            onclick: function () {
                this.model.set("IsSelected", true);
                this.trigger("selected", "");
            }
        });


        Security.Views.Modules = Marionette.CollectionView.extend({
            tagName: "ul",
            className: 'nav',
            itemView: Security.Views.Module,
            itemViewEventPrefix: "itemview",
            onBeforeRender: function () {
                this.on("itemview:selected", function (childView, msg) {
                    _.each(this.collection.models, function (model) {
                        if (!(model === childView.model)) {
                            model.set("IsSelected", false);
                        }
                    });
                });
            }
        });


    });


});

