define([
// Libs
    "gl",
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",

    "text!./templates/main.htm",
    "kendoweb"
],

function (GL, namespace, Backbone, Marionette, $, _, MainTemplate, kendo) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("GMC", function (GMC, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        GMC.Views = {};



        GMC.Views.MainView = Marionette.ItemView.extend({
            template: MainTemplate,
            onShow: function () {
                var chart;
                var legend;

                var chartData = [{
                    country: "Lithuania",
                    value: 260
                },
                {
                    country: "Ireland",
                    value: 201
                },
                {
                    country: "Germany",
                    value: 65
                },
                {
                    country: "Australia",
                    value: 39
                },
                {
                    country: "UK",
                    value: 19
                },
                {
                    country: "Latvia",
                    value: 10
                }];

                require(['http://www.amcharts.com/lib/amcharts.js'], function (AmChart) {
                    // PIE CHART
                    chart = new AmCharts.AmPieChart();
                    chart.dataProvider = chartData;
                    chart.titleField = "country";
                    chart.valueField = "value";
                    chart.outlineColor = "#FFFFFF";
                    chart.outlineAlpha = 0.8;
                    chart.outlineThickness = 0;
                    //chart.height = "500px"
//                    chart.addListener("clickSlice", function (a) {
//                        //alert(a.dataItem.title);
//                    });

                    // this makes the chart 3D
                    chart.depth3D = 15;
                    chart.angle = 30;

                    // WRITE
                    chart.write("chartdiv");
                    var svg = $("#chartdiv svg");
                    if (svg[0] != null)
                        svg[0].style.position = "";
                     
                    var div = $("#chartdiv div");
                    if (div[0] != null)
                        div[0].style.overflow = "";
                });

            }

        });



    });


});