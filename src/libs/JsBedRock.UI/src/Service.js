JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Service = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (context) {
                this._Context = context;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: { Def: "" },
                _Context: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);