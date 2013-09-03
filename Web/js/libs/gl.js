define([
// Libs
	"namespace",
	"backbone",
    "subroute",
    "marionette",
	"jquery",
	"underscore",
    
    "knockout",
],

function (namespace, Backbone, s, Marionette, $, _, ko) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("GL", function (GL, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        GL.Views = {};

        //GL.Views.KendoMvvmView = Marionette.ItemView.extend({

        //    onShow: function () {
        //        this.bind();
        //    },

        //    bind: function () {
        //        kendo.bind(this.$el, this.viewModel);
        //        this.getValidationAttributesFromModel(this.viewModel.model.fields);
        //        this.viewModel.validator = this.$el.kendoValidator().data("kendoValidator");
        //    },

        //    getValidationAttributesFromModel: function (myFields) {
        //        var myValidatedFields = [];
        //        var obj = null;
        //        $.each(myFields, function (fieldName) {
        //            if (this.validation) {
        //                var obj = {
        //                    fieldName: fieldName,
        //                    validation: this.validation
        //                };
        //                myValidatedFields.push(obj);
        //            }
        //        });

        //        this.addValidationAttributes(myValidatedFields);
        //    },

        //    addValidationAttributes: function (myValidatedFields) {
        //        $.each(myValidatedFields, function (index) {
        //            $('#' + this.fieldName).attr(this.validation);
        //        });
        //    }

        //});
        GL.Views.KnockOutMvvmView = Marionette.ItemView.extend({

            onShow: function () {
                this.viewModel.parentView = this;
                ko.applyBindings(this.viewModel, $(this.el)[0]);

            }


        });

        GL.Views.MvvmView = GL.Views.KnockOutMvvmView;
        GL.Post = function (type, data, successCallback, failureCallback, finallyCallback) {
            var token = "";
            if ((app.Security.Models.loggedInUser.get("LoginToken") != undefined && app.Security.Models.loggedInUser.get("LoginToken") != ""));
            token = app.Security.Models.loggedInUser.get("LoginToken");

            $.ajax({
                type: 'POST',
                url: '/services/Service.svc/Command',
                data: JSON.stringify({
                    LoginToken: token,
                    Command: {
                        UniqueIdentifier: Math.floor((Math.random() * 1000) + 1),
                        CommandName: type,
                        JSON: JSON.stringify(data)
                    }
                }),
                contentType: "application/json; charset=utf-8",
                success: function (d, s, h) {
                    if (d.IsSuccess) {
                        var response = JSON.parse(d.JSON);
                        if (successCallback)
                            successCallback(response);
                    } else {
                        if (failureCallback)
                            failureCallback(d.Message);
                    }
                    if (finallyCallback)
                        finallyCallback(d);
                }
            });
        };



        GL.PostItem = function (type, data, successCallback, failureCallback, finallyCallback) {
            this.type = type;
            this.data = data;
            this.successCallback = successCallback;
            this.failureCallback = failureCallback;
            this.finallyCallback = finallyCallback;
            this.UniqueIdentifier = Math.floor((Math.random() * 1000) + 1);
        };

        GL.BatchPost = function () {
            this.postItems = [];
            this.Add = function (type, data, successCallback, failureCallback, finallyCallback) {
                var item = new GL.PostItem(type, data, successCallback, failureCallback, finallyCallback);
                this.postItems.push(item);
            };

            this.Post = function () {
                _.bindAll(this);

                var token = "";
                if (GL.GetLoginToken)
                    token = GL.GetLoginToken();


                var commands = [];
                _.each(this.postItems, function (item) {
                    commands.push({
                        UniqueIdentifier: item.UniqueIdentifier,
                        CommandName: item.type,
                        JSON: JSON.stringify(item.data)
                    });
                });
                $.ajax({
                    type: 'POST',
                    url: '/services/Service.svc/Commands',
                    data: JSON.stringify({
                        LoginToken: token,
                        Commands: commands
                    }),
                    contentType: "application/json; charset=utf-8",
                    success: this.success
                });

            }
            this.success = function (dd, s, h) {

                _.each(dd, this.respond);
            };

            this.respond = function (d) {
                var item = _.find(this.postItems, function (e) {
                    return e.type == d.CommandName && e.UniqueIdentifier == d.UniqueIdentifier;
                });
                if (d.IsSuccess) {
                    var response = JSON.parse(d.JSON);
                    if (item.successCallback)
                        item.successCallback(response);
                } else {
                    if (item.failureCallback)
                        item.failureCallback(d.Message);
                }
                if (item.finallyCallback)
                    item.finallyCallback(d);
            };


        }


        GL.ModuleRouter = Backbone.SubRoute.extend({
            before: function (route) {
                var loginToken = "";
                if (GL.GetLoginToken)
                    loginToken = GL.GetLoginToken();


                if (loginToken == "") {
                    this.navigate("/Security/Login/" + route, true);
                    return false;
                }
                this.UpdateModel(route.split("/")[0]);
                if (this.beforeRoute)
                    return this.beforeRoute(route);


                return true;
            },

            UpdateModel: function (ModName) {
                if (app.Security.UserModules != null) {
                    var collection = app.Security.UserModules;

                    var module = collection.where({ ModName: ModName });
                    if(module.length>=1)
                        module[0].set("IsSelected", true);
                }

            }


        });

        GL.ModalRegion = Backbone.Marionette.Region.extend({
            el: "#modal",

            initialize: function () {
                _.bindAll(this);
                //Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
                this.on("show", this.showModal, this);
            },

            getEl: function (selector) {
                var $el = $(selector);
                $el.on("hidden", this.close);
                return $el;
            },

            showModal: function (view) {
                view.on("close", this.hideModal, this);
                this.$el.parent().modal('show');
            },

            hideModal: function () {
                this.$el.parent().modal('hide');
            }
        });

        GL.TransitionRegion = Backbone.Marionette.Region.extend({

            show: function (view) {
                var self = this;
                this.ensureEl();

                var isViewClosed = view.isClosed || _.isUndefined(view.$el) || this.currentView == undefined;

                var isDifferentView = view !== this.currentView;

                if (isDifferentView) {
                    this.promiseClose(view).done(function () {
                        view.render();

                        if (isDifferentView || isViewClosed) {
                            view.render();

                            if (isDifferentView || isViewClosed) {
                                self.open(view);
                            }

                            self.currentView = view;
                            self.mycurrentView = view;
                            self.$el.addClass("baseAnimation").addClass("loaded");
                            self.$el.removeClass("loaded").addClass("displayed");
                            Marionette.triggerMethod.call(self, "show", view);
                            Marionette.triggerMethod.call(view, "show");
                        }

                        
                    });
                }

                
            },

            promiseClose: function (view) {
                var that = this;
                var deferred = $.Deferred();
                
                if (!this.currentView || this.currentView.isClosed) {
                    deferred.resolve();
                    return  deferred.promise();
                }
                var el = this.$el;
                el.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    el.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                    el.removeClass("unloaded").removeClass("displayed");
                    that.close();
                    deferred.resolve();
                });
                el.addClass("unloaded");
                return deferred.promise();
                
            }

        });
        

        return app.GL;


    });


});