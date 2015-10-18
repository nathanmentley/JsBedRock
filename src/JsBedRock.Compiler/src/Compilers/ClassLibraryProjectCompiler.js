JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.ClassLibraryProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
                _BuildProject: function () {
                    return this._ConcatFile(
                        this.Base(),
                        this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.ClassLibrary + ".js"
                    );
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);