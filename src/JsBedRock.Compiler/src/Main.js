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
                        var projectFile = settingResolver.ResolveSolutionSetting(solutionData, solutionData.Projects[i]);
                        var projectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                        
                        var projectCompiler = this.ProjectCompilerFactory(solutionData, projectData, projectFile);
                        
                        projectCompiler.CompileProject();
                    }
                },
                ProjectCompilerFactory: function (solutionData, projectData, projectFile) {
                    switch(projectData.ProjectType){
                        case JsBedRock.Compiler.ProjectTypes.Assets:
                            return new JsBedRock.Compiler.AssetProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.BrowserExecutable:
                            return new JsBedRock.Compiler.BrowserExecutableProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.ClassLibrary:
                            return new JsBedRock.Compiler.ClassLibraryProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.NodeExecutable:
                            return new JsBedRock.Compiler.NodeExecutableProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.TestRunner:
                            return new JsBedRock.Compiler.TestRunnerProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        default:
                            return new JsBedRock.Compiler.ProjectCompilerBase(solutionData, projectData, projectFile);
                            break;
                    };
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);