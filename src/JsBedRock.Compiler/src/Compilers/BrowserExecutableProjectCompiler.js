JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: (JsBedRock.Compiler.BrowserExecutableProjectCompiler = function (soultionData, solutionFile, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
                CompileProject: function () {
                    this.Base();
                    
                    this._CreateHtmlIndexFile();
                },
                _GetSourceFiles: function () {
                    var ret = this.Base();
                    
                    ret.push(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.BrowserExecutable + ".js");
                    
                    return ret;
                },
                _CopyDependencies: function() {
                    //copy framework libraries.
                    var outputPath = this.__Path.dirname(this._OutputFile);
                    
                    for(var i =0; i < this._ProjectData.Dependencies.length; i++) {
                        var sourceFile = this._GetSdkLocation(this._SolutionData) + this._ProjectData.Dependencies[i] + ".js";
                        var targetFile = outputPath + '/' + this._ProjectData.Dependencies[i] + ".js";
                        
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            sourceFile,
                            targetFile
                        );
                    }
                    
                    this.Base();
                },
                _CreateHtmlIndexFile: function () {
                    var htmlContent = (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(this._GetSdkLocation(this._SolutionData) + "AssemblyAssets/BrowserExecutable/index.html").toString();
                    var tempFile = new JsBedRock.Compiler.TempFile(this._ResolveHtmlTemplate(htmlContent));
                    
                    (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                        tempFile.GetFileName(),
                        this.__Path.dirname(this._OutputFile) + "/index.html"
                    );
                    
                    tempFile._CleanUpFile();
                },
                _ResolveHtmlTemplate: function(content) {
                    return (new JsBedRock.Compiler.SettingResolver()).ResolveProjectSetting(this._ProjectData, content);
                }
            },
            Name: 'BrowserExecutableProjectCompiler'
        });
    });
})(JsBedRock.CurrentAssembly);