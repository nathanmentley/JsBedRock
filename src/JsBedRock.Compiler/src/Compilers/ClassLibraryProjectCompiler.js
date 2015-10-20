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
                    var asmConfig = (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/AsmConfig.js").toString();
                    
                    return this._ResolveAsmConfig(asmConfig) +
                        this._ConcatFile(
                            this.Base(),
                            this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.ClassLibrary + ".js"
                        );
                },
                _ResolveAsmConfig: function(asmConfig) {
                    return this.__SettingResolver.ResolveProjectSetting(this._ProjectData, asmConfig);
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);