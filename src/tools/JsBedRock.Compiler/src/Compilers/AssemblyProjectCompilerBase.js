JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ProjectCompilerBase,
            Constructor: (JsBedRock.Compiler.AssemblyProjectCompilerBase = function (soultionData, solutionFile, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ProjectCompilerBase, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
                CompileProject: function () {
                    var asmConfigTemplate = (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/AsmConfig.js").toString();
                    this.__AsmConfigTempFile = new JsBedRock.Compiler.TempFile(this._ResolveAsmConfig(asmConfigTemplate));
                    
                    this.Base();
                    
                    this.__AsmConfigTempFile._CleanUpFile();
                },
                _GetSourceFiles: function () {
                    var ret = this.Base();
                    
                    ret.unshift(this.__AsmConfigTempFile.GetFileName());
                    
                    return ret;
                },
                _ResolveAsmConfig: function(asmConfig) {
                    return this.__SettingResolver.ResolveProjectSetting(this._ProjectData, asmConfig);
                },
                __AsmConfigTempFile: null
            },
            Name: 'AssemblyProjectCompilerBase'
        });
    });
})(JsBedRock.CurrentAssembly);