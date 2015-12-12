JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.Accessors = JsBedRock.Node.Db.Accessors || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Db.Accessors.AccessorBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
            }
        });
    });
})(JsBedRock.CurrentAssembly);