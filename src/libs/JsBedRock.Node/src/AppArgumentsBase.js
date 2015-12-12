JsBedRock.Node = JsBedRock.Node || {};

//JsBedRock.Node.IO
(function (asm) {
    asm.OnLoad(function () {
		//Private Static fs object.
		
        JsBedRock.Node.AppArgumentsBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                for(var i = 0; i < process.argv.length; i++) {
                    if(process.argv[i].indexOf('-', 0) === 0 && process.argv.length > i) {
                        this[process.argv[i].substring(1, process.argv[i].length)] = process.argv[++i];
                    }
                }
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
            }
        });
    });
})(JsBedRock.CurrentAssembly);