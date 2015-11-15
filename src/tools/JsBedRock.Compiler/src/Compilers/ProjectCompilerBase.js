JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.ProjectCompilerBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (soultionData, solutionFile, projectData, projectFile) {
                this.__Uglifyjs = require('uglify-js');
                this.__Path = require('path');
                this.__SettingResolver = new JsBedRock.Compiler.SettingResolver();
                
                this._SolutionData = soultionData;
                this._SolutionDir = this.__Path.dirname(solutionFile);
                this._ProjectData = projectData;
                this._ProjectDir = this.__Path.dirname(projectFile);
                
                if(this._ProjectData)
                    this._OutputFile = this.__Path.join(this._ProjectDir, this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._ProjectData.OutputFile));
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				CompileProject: function () {
                    this._WriteOutputFile(this.__Uglifyjs.minify(this._GetSourceFiles(), this._GetUglifyJsOptions()));
                },
                _GetSourceFiles: function () {
                    var ret = [];
                    for (var j = 0; j < this._ProjectData.SourceFiles.length; j++)
                        ret.push(this.__Path.join(this._ProjectDir, this._ProjectData.SourceFiles[j]));
                    return ret;
                },
                _WriteOutputFile: function(compiledFile) {
                    this._EnsureDirectoryExists(this.__Path.dirname(this._OutputFile));
                    
                    if(!JsBedRock.Utils.String.IsEmptyOrSpaces(this._OutputFile)){
                        (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(this._OutputFile, compiledFile.code);   
                        (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(this._OutputFile + ".map", compiledFile.map);   
                    }
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
                _GetSdkLocation: function () {
                    if(JsBedRock.Utils.String.IsEmptyOrSpaces(this._SolutionData.SDKLocationOverride))
                        return __dirname + "/sdk/" + this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._SolutionData.FrameworkVersion) + "/";
                        
                    return this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._SolutionData.SDKLocationOverride);
                },
                _GetUglifyJsOptions: function () {
                    var ret = {
                        outSourceMap: this._OutputFile + ".map"
                    };
                    
                    if('DebugSourceRoot' in this._ProjectData)
                        ret.sourceRoot = this._ProjectData['DebugSourceRoot'];
                    
                    return ret;
                },
                _SolutionData: null,
                _SolutionDir: null,
                _ProjectData: null,
                _ProjectDir: null,
                _OutputFile: null,
                __Path: null,
                __Uglifyjs: null
            },
            Name: 'ProjectCompilerBase'
        });
    });
})(JsBedRock.CurrentAssembly);