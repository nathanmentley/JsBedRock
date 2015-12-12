JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.Compiler = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.__Path = require("path");
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				BuildSolution: {
                    Def: function (soluiton) {
                        var settingResolver = new JsBedRock.Compiler.SettingResolver();
                        
                        var solutionDir = this.__Path.dirname(soluiton);
                        var solutionFile = soluiton;
                        
                        var solutionData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(solutionFile).toString());
                        
                        try{
                            for(var i = 0; i < solutionData.Projects.length; i++){
                                var projectFile = this.__Path.join(solutionDir, settingResolver.ResolveSolutionSetting(solutionData, solutionData.Projects[i]));
                                var projectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                                
                                var projectCompiler = this.ProjectCompilerFactory(solutionData, solutionFile, projectData, projectFile);
                                
                                projectCompiler.CompileProject();
                            }
                        }
                        catch(e)
                        {
                            JsBedRock.Console.Write(JsBedRock.Console.Dump(e));
                            throw e;
                        }
                    }
                },
                ProjectCompilerFactory: {
                    Def: function (solutionData, solutionFile, projectData, projectFile) {
                        switch(projectData.ProjectType){
                            case JsBedRock.Compiler.ProjectTypes.Assets:
                                return new JsBedRock.Compiler.AssetProjectCompiler(solutionData, solutionFile, projectData, projectFile);
                                break;
                            case JsBedRock.Compiler.ProjectTypes.BrowserExecutable:
                                return new JsBedRock.Compiler.BrowserExecutableProjectCompiler(solutionData, solutionFile, projectData, projectFile);
                                break;
                            case JsBedRock.Compiler.ProjectTypes.ClassLibrary:
                                return new JsBedRock.Compiler.ClassLibraryProjectCompiler(solutionData, solutionFile, projectData, projectFile);
                                break;
                            case JsBedRock.Compiler.ProjectTypes.NodeExecutable:
                                return new JsBedRock.Compiler.NodeExecutableProjectCompiler(solutionData, solutionFile, projectData, projectFile);
                                break;
                            case JsBedRock.Compiler.ProjectTypes.NodeInstallerExecutable:
                                return new JsBedRock.Compiler.NodeInstallerExecutableProjectCompiler(solutionData, solutionFile, projectData, projectFile);
                                break;
                            case JsBedRock.Compiler.ProjectTypes.TestRunner:
                                return new JsBedRock.Compiler.TestRunnerProjectCompiler(solutionData, solutionFile, projectData, projectFile);
                                break;
                            case JsBedRock.Compiler.ProjectTypes.VSCodeExtension:
                                return new JsBedRock.Compiler.VSCodeExtensionProjectCompiler(solutionData, solutionFile, projectData, projectFile);
                                break;
                            default:
                                return new JsBedRock.Compiler.ProjectCompilerBase(solutionData, solutionFile, projectData, projectFile);
                                break;
                        };
                    }
                },
                __Path: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);