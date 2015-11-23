JsBedRock.Types = JsBedRock.Types || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Types.Attribute = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
            }
        });
    });
})(JsBedRock.CurrentAssembly);