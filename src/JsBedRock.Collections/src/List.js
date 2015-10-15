window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Hidden = JsBedRock.Collections.Hidden || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Hidden.List = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: "List",
                Init: function () {
                    this.Base();
                },
                GetName: function () {
                    return this.Name;
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);