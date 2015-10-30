JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.ComponentRenderer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (component) {
                this._Component = component;
                this._Component.SetRenderer(this);
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Render: function () {
                    
                },
                _Component: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);