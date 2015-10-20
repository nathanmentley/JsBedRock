JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.ExecutableProjectCompilerBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Compiler.ProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
				CompileProject: function () {
                    this.Base();
                    
                    this._CopyDependencies();
                },
                _BuildProject: function () {
                    var asmConfig = (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/AsmConfig.js").toString();
                    
                    return this._ConcatFile('', this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js") +
                        this._ResolveAsmConfig(asmConfig) +
                        this.Base();
                },
                _ResolveAsmConfig: function(asmConfig) {
                    return this.__SettingResolver.ResolveProjectSetting(this._ProjectData, asmConfig);
                },
                _CopyDependencies: function() {
                    //TODO: Support non framework dependencies.
                    var outputPath = this.__Path.dirname(this._OutputFile);
                    
                    for(var i =0; i < this._ProjectData.Dependencies.length; i++) {
                        var sourceFile = this._GetSdkLocation(this._SolutionData) + this._ProjectData.Dependencies[i] + ".js";
                        var targetFile = outputPath + '/' + this._ProjectData.Dependencies[i] + ".js";
                        
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            sourceFile,
                            targetFile
                        );
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);