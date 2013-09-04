require.config({
    urlArgs: "bust=" + "V2",
    paths: {
        libs: "libs",
        templates: "../templates",
        jquery: "libs/jquery/jquery-1.8.0",
        underscore: "libs/underscore/underscore-1.3.3",
        backbone: "libs/backbone/backbone",
        subroute: "libs/backbone.subroute/backbone-subroute",
        routefilter: "libs/backbone.routefilter/backbone-routefilter",
        marionette: "libs/backbone.marionette/backbone.marionette",
        localstorage: "libs/backbone.localstorage/backbone.localstorage-1.0",
        bootstrap: "libs/bootstrap/bootstrap.min",
        knockout: "libs/knockout/knockout.min",
        knockback: "libs/knockout/knockback.min",
        gl: "libs/gl",
        text: "libs/require/text-2.0.3"
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: [
                "underscore", 
                "jquery"
            ],
            exports: "Backbone"
        },
        "marionette": {
            deps: [
                "underscore", 
                "jquery"
            ],
            exports: "Marionette"
        },
        "subroute": {
            deps: [
                "underscore", 
                "jquery"
            ]
        },
        "routefilter": {
            deps: [
                "underscore", 
                "jquery"
            ]
        },
        "localstorage": {
            deps: [
                "backbone"
            ]
        },
        "bootstrap": {
            deps: [
                "jquery"
            ]
        },
        "knockout": {
            exports: "ko"
        },
        "knockback": {
            deps: [
                "knockout"
            ],
            exports: "kb"
        }
    }
});
require([
    "namespace", 
    "jquery", 
    "backbone", 
    "gl", 
    "system/General/Main", 
    "bootstrap"
], function (namespace, $, Backbone, GL, General) {
    var app = namespace.app;
    app.addRegions({
        modules: "#top_left",
        security: "#top_right",
        content: {
            selector: "#app_main_content",
            regionType: app.GL.TransitionRegion
        }
    });
    app.addInitializer(function () {
    });
    app.on("initialize:after", function () {
        app.addRegions({
            modal: app.GL.ModalRegion
        });
        Backbone.history.start();
    });
    $(function () {
        return app.start();
    });
});
//@ sourceMappingURL=main.js.map
