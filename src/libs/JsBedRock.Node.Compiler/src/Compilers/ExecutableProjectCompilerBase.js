JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Compiler.AssemblyProjectCompilerBase,
            Constructor: (JsBedRock.Compiler.ExecutableProjectCompilerBase = function (soultionData, solutionFile, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.AssemblyProjectCompilerBase, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
				CompileProject: {
                    Def: function () {
                        this.Base();
                        
                        this._CopyDependencies();
                        this._CopyConfig();
                    }
                },
                _GetSourceFiles: {
                    Def: function () {
                        var ret = this.Base();
                        
                        ret.unshift(this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js");
                        
                        return ret;
                    }
                },
                _CopyDependencies: {
                    Def: function() {
                        var outputPath = this.__Path.dirname(this._OutputFile);
                        
                        for(var i = 0; i < this._ProjectData.Dependencies.length; i++) {
                            for(var j = 0; j < this._SolutionData.Projects.length; j++) {
                                var projectFile = this.__Path.join(this._SolutionDir,
                                    this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._SolutionData.Projects[j])
                                );
                                
                                var projectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                                
                                if(this._ProjectData.Dependencies[i] === projectData.Name) {
                                    var targetFile = outputPath + '/' + this._ProjectData.Dependencies[i] + ".js";
                                            
                                    (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                                        this.__Path.join(
                                            this.__Path.dirname(projectFile),
                                            this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, projectData.OutputFile)
                                        ),
                                        targetFile
                                    );
                                }
                            }
                        }
                    }
                },
                _CopyConfig: {
                    Def: function() {
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            this._ProjectDir + "/config.json",
                            this.__Path.dirname(this._OutputFile) + "/config.json"
                        );
                    }
                }
            },
            Name: 'ExecutableProjectCompilerBase'
        });
    });
})(JsBedRock.CurrentAssembly);