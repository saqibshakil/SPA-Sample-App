declare var require:any;
// Set the require.js configuration
require.config({
    urlArgs: "bust=" + "V2", 
	// If no baseUrl is explicitly set in the configuration, the default value
    // will be the location of the HTML page that loads require.js.
    // If a data-main attribute is used, that path will become the baseUrl.

    // Path mappings for module names not found directly under baseUrl.
    // The path settings are assumed to be relative to baseUrl, unless the paths
    // setting starts with a "/" or has a URL protocol in it ("like http:").
    // In those cases, the path is determined relative to baseUrl.
	paths: {
        // JavaScript folders
        libs: "libs",
        
        // Templates folder
        templates: "../templates",
        
		// Libraries
		jquery: "libs/jquery/jquery-1.8.0",
		underscore: "libs/underscore/underscore-1.3.3",
		backbone: "libs/backbone/backbone",
        subroute: "libs/backbone.subroute/backbone-subroute",
        routefilter: "libs/backbone.routefilter/backbone-routefilter",
		marionette: "libs/backbone.marionette/backbone.marionette",
		localstorage: "libs/backbone.localstorage/backbone.localstorage-1.0",
        kendoweb: "libs/kendo.web/kendo.web.min",
        bootstrap: "libs/bootstrap/bootstrap.min",
        knockout: "libs/knockout/knockout.min",
        knockback: "libs/knockout/knockback.min",

		gl: "libs/gl",
		
		// Require plugins
		text: "libs/require/text-2.0.3"
	},
	
	// Configure the dependencies and exports for older, traditional "browser globals"
    // scripts that do not use define() to declare the dependencies and set a module value.
	shim: {
	    "underscore": {
	        exports: "_"
	    },

	    "backbone": {
        	// These script dependencies should be loaded before loading backbone.js
        	deps: ["underscore", "jquery"],
        	// Once loaded, use the global "Backbone" as the module value.
            exports: "Backbone"
	    },
        "marionette": {
            deps: ["underscore", "jquery"],
            exports: "Marionette"
        },
	    "subroute": {
        	// These script dependencies should be loaded before loading backbone.js
        	deps: ["underscore", "jquery"]
	    },
        "kendoweb": {
        	deps: ["jquery"],
            exports: "kendo"
	    },
        "routefilter": {
        	deps: ["underscore", "jquery"]
	    },
	    "localstorage": {
        	deps: ["backbone"]
	    },
        "bootstrap": {
            deps: ["jquery"]
        },
        "knockout": {
            exports: "ko"
        },
        "knockback": {
            deps: ["knockout"],
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
],

function (namespace, $, Backbone, GL, General) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Regions are visual areas of the DOM, where specific views
    // will be displayed.	
    app.addRegions({
        modules: "#top_left",
        security: "#top_right",
        content: {
            selector: "#app_main_content",
            regionType: app.GL.TransitionRegion
        }
   
    });
    
    

    // Add application initailization part.
    // Remember that the downloaded modules also can add its own initialization part
    app.addInitializer(function () {

    });

    // After application initialization kick off our route handlers.
    app.on("initialize:after", ()=> {
        app.addRegions({
            modal: app.GL.ModalRegion
        });

        Backbone.history.start();

    });

    // This is the part where the application start
    //$(document).ready(function(){
    $(() =>app.start()); 
    // this is an alias to jQuery's DOMReady function
    //        var Router = new General.Router({options: {}});
        

});
