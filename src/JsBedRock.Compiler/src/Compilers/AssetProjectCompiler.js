JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.AssetProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
                CompileProject: function () {
                    for (var j = 0; j < this._ProjectData.SourceFiles.length; j++){
                        var targetFile = this.__Path.join(this._OutputFile, this._ProjectData.SourceFiles[j]);
                        this._EnsureDirectoryExists(this.__Path.dirname(targetFile));
                    
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            this.__Path.join(this._ProjectDir, this._ProjectData.SourceFiles[j]),
                            targetFile
                        );
                    }
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);