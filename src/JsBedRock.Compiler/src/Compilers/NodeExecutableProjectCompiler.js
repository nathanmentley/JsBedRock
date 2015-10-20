JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: (JsBedRock.Compiler.NodeExecutableProjectCompiler = function (soultionData, solutionFile, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
                _GetSourceFiles: function () {
                    var ret = this.Base();
                    
                    ret.push(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.NodeExecutable + ".js");
                    
                    return ret;
                }
            },
            Name: 'NodeExecutableProjectCompiler'
        });
    });
})(JsBedRock.CurrentAssembly);