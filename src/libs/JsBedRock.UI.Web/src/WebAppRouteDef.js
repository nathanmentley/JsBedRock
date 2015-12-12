JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Web.WebAppRouteDef = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (component, context) {
                this.Component = component;
                this.Context = context;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Component: { Def: null },
                Context: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);