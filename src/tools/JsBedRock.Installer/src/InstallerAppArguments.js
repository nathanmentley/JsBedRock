//JsBedRock.Node.IO
(function (asm) {
    asm.OnLoad(function () {
		//Private Static fs object.
		JsBedRock.InstallerAppArguments = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.AppArgumentsBase,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.AppArgumentsBase);
            },
            Members: {
                Path:  { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);