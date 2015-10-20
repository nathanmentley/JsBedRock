JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Compiler.AssemblyProjectCompilerBase,
            Constructor: (JsBedRock.Compiler.ExecutableProjectCompilerBase = function (soultionData, solutionFile, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.AssemblyProjectCompilerBase, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
				CompileProject: function () {
                    this.Base();
                    
                    this._CopyDependencies();
                },
                _GetSourceFiles: function () {
                    var ret = this.Base();
                    
                    ret.unshift(this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js");
                    
                    return ret;
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
            },
            Name: 'ExecutableProjectCompilerBase'
        });
    });
})(JsBedRock.CurrentAssembly);