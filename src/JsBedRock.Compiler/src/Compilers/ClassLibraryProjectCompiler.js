JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.AssemblyProjectCompilerBase,
            Constructor: (JsBedRock.Compiler.ClassLibraryProjectCompiler = function (soultionData, solutionFile, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.AssemblyProjectCompilerBase, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
                _GetSourceFiles: function () {
                    var ret = this.Base();
                    
                    ret.push(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.ClassLibrary + ".js");
                    
                    return ret;
                }
            },
            Name: 'ClassLibraryProjectCompiler'
        });
    });
})(JsBedRock.CurrentAssembly);