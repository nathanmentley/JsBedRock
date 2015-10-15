window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Generic = JsBedRock.Collections.Generic || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Generic.List1 = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Collections.Hidden.List,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Collections.Hidden.List);
            },
            Members: {
                Name: "List1"
            }
        });
    });
})(JsBedRock.CurrentAssembly);