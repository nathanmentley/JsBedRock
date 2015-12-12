(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: {
                    Def: function (appArgs) {
                        var compiler = new JsBedRock.Compiler.Compiler();
                        
                        compiler.BuildSolution(appArgs.Solution);
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);