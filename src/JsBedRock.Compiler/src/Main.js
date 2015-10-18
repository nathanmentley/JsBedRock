(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    var settingResolver = new JsBedRock.Compiler.SettingResolver();
                    
                    var solutionFile = process.argv[2];
                    var solutionData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(solutionFile).toString());
                    
                    for(var i = 0; i < solutionData.Projects.length; i++){
                        var projectCompiler = new JsBedRock.Compiler.ProjectCompiler(solutionData, settingResolver.ResolveSolutionSetting(solutionData, solutionData.Projects[i]));
                        
                        projectCompiler.CompileProject();
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);