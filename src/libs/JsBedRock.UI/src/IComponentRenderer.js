JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.IComponentRenderer = JsBedRock.Utils.ObjectOriented.CreateInterface({
            Members: {
                Init: function (componentFactory) {},
                Render: function (template, model, component) {}
            },
            Name: "IComponentRenderer"
        });
    });
})(JsBedRock.CurrentAssembly);