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
                    this._CopyConfig();
                },
                _GetSourceFiles: function () {
                    var ret = this.Base();
                    
                    ret.unshift(this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js");
                    
                    return ret;
                },
                _CopyDependencies: function() {
                    //TODO: copy non framework libraries.
                },
                _CopyConfig: function() {
                    (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                        this._ProjectDir + "/config.json",
                        this.__Path.dirname(this._OutputFile) + "/config.json"
                    );
                }
            },
            Name: 'ExecutableProjectCompilerBase'
        });
    });
})(JsBedRock.CurrentAssembly);