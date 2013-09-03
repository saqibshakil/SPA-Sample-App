define([
    "underscore", 
    "marionette"
], function (_, Marionette) {
    return {
        app: new Marionette.Application(),
        module: function (additionalProps) {
            return _.extend({
            }, additionalProps);
        },
        todoFilter: "",
        ENTER_KEY: 13
    };
});
//@ sourceMappingURL=namespace.js.map
