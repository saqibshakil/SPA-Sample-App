define([
    "gl", 
    "namespace", 
    "backbone", 
    "marionette", 
    "jquery", 
    "underscore", 
    "text!./templates/main.htm", 
    
], function (GL, namespace, Backbone, Marionette, $, _, MainTemplate) {
    var app = namespace.app;
    app.module("Connect", function (Connect, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        Connect.Views = {
        };
        Connect.Views.MainView = Marionette.ItemView.extend({
            template: MainTemplate
        });
    });
});
//@ sourceMappingURL=Views.js.map
