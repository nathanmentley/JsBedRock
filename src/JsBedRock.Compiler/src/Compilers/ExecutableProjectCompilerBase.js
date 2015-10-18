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
                    //return this._ConcatFile('', this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js") + this.Base();
                    return this.Base();
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