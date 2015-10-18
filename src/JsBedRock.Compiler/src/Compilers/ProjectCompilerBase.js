JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        var PrivateStatics = {
            NewLineChar: "\r\n"
        };
        
        JsBedRock.Compiler.ProjectCompilerBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (soultionData, projectData, projectFile) {
                this.__Path = require('path');
                this.__SettingResolver = new JsBedRock.Compiler.SettingResolver();
                
                this._SolutionData = soultionData;
                this._ProjectData = projectData;
                this._ProjectDir = this.__Path.dirname(projectFile);
                this._OutputFile = this.__Path.join(this._ProjectDir, this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._ProjectData.OutputFile));
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				CompileProject: function () {
                    this._WriteOutputFile(
                        this._BuildProject()
                    );
                },
                _BuildProject: function () {
                    var compiledFile = '';
                    
                    for (var j = 0; j < this._ProjectData.SourceFiles.length; j++){
                        compiledFile = this._ConcatFile(compiledFile, this.__Path.join(this._ProjectDir, this._ProjectData.SourceFiles[j]));
                    }
                    
                    return compiledFile;
                },
                _WriteOutputFile: function(compiledFile) {
                    this._EnsureDirectoryExists(this.__Path.dirname(this._OutputFile));
                    
                    if(!JsBedRock.Utils.String.IsEmptyOrSpaces(this._OutputFile))
                        (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(this._OutputFile, compiledFile);   
                },
                _EnsureDirectoryExists: function(directory) {
                    var paths = directory.split(this.__Path.sep);
                    
                    if(paths.length > 1) {
                        paths.pop();
                        this._EnsureDirectoryExists(paths.join(this.__Path.sep));
                    }
                    
                    if(!(new JsBedRock.Node.IO.FileSystem()).DirectoryExistsSync(directory)) {
                       (new JsBedRock.Node.IO.FileSystem()).MkDirSync(directory);
                    }
                },
                _GetSdkLocation: function (solutionData) {
                    if(JsBedRock.Utils.String.IsEmptyOrSpaces(solutionData.SDKLocationOverride))
                        return __dirname + "/sdk/" + this.__SettingResolver.ResolveSolutionSetting(solutionData, solutionData.FrameworkVersion) + "/";
                        
                    return this.__SettingResolver.ResolveSolutionSetting(solutionData, solutionData.SDKLocationOverride);
                },
                _ConcatFile: function (currentFile, fileToAdd) {
                    return currentFile + PrivateStatics.NewLineChar + ";" + PrivateStatics.NewLineChar +
                        (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(fileToAdd).toString();
                },
                _SolutionData: null,
                _ProjectData: null,
                _ProjectDir: null,
                _OutputFile: null,
                __Path: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);