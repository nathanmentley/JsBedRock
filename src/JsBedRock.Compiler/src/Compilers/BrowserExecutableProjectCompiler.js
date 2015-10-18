JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.BrowserExecutableProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
                _BuildProject: function () {
                    return this._ConcatFile(
                        (this._ConcatFile('', this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js") + this.Base()),//this.Base(),
                        this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.BrowserExecutable + ".js"
                    );
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);