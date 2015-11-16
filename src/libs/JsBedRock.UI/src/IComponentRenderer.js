JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.IComponentRenderer = JsBedRock.Utils.ObjectOriented.CreateInterface({
            Members: {
                Render: function (template, model, context) {}
            },
            Name: "IComponentRenderer"
        });
    });
})(JsBedRock.CurrentAssembly);