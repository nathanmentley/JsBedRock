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
				CompileProject: {
                    Def: function () {
                        var sourceFiles = this._GetSourceFiles();
                        
                        for(var i = 0; i < sourceFiles.length; i++){
                            this._LintFile(sourceFiles[i]);
                        }
                        
                        this._WriteOutputFile(this.__Uglifyjs.minify(sourceFiles, this._GetUglifyJsOptions()));
                    }
                },
                _GetSourceFiles: {
                    Def:  function () {
                        var ret = [];
                        for (var j = 0; j < this._ProjectData.SourceFiles.length; j++)
                            ret.push(this.__Path.join(this._ProjectDir, this._ProjectData.SourceFiles[j]));
                        return ret;
                    }
                },
                _LintFile: {
                    Def: function(file){
                        var jshint = require('jshint').JSHINT;
                        
                        jshint(
                            (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(file).toString(),
                            {
                                undef: true
                            },
                            {
                                JsBedRock: true
                            }
                        );
                        
                        var data = jshint.data();
                        if(data && data.errors && data.errors.length > 0){
                            //JsBedRock.Console.Write(file);
                            //console.log(data.errors);
                        }
                    }
                },
                _WriteOutputFile: {
                    Def: function(compiledFile) {
                        this._EnsureDirectoryExists(this.__Path.dirname(this._OutputFile));
                        
                        if(!JsBedRock.Utils.String.IsEmptyOrSpaces(this._OutputFile)){
                            (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(this._OutputFile, compiledFile.code);   
                            (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(this._OutputFile + ".map", compiledFile.map);   
                        }
                    }
                },
                _EnsureDirectoryExists: {
                    Def: function(directory) {
                        var paths = directory.split(this.__Path.sep);
                        
                        if(paths.length > 1) {
                            paths.pop();
                            this._EnsureDirectoryExists(paths.join(this.__Path.sep));
                        }
                        
                        if(!(new JsBedRock.Node.IO.FileSystem()).DirectoryExistsSync(directory)) {
                        (new JsBedRock.Node.IO.FileSystem()).MkDirSync(directory);
                        }
                    }
                },
                _GetSdkLocation: {
                    Def: function () {
                        if(JsBedRock.Utils.String.IsEmptyOrSpaces(this._SolutionData.SDKLocationOverride))
                            return __dirname + "/../../";
                            
                        return this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._SolutionData.SDKLocationOverride);
                    }
                },
                _GetUglifyJsOptions: {
                    Def: function () {
                        var ret = {
                            outSourceMap: this._OutputFile + ".map"
                        };
                        
                        if('DebugSourceRoot' in this._ProjectData)
                            ret.sourceRoot = this._ProjectData['DebugSourceRoot'];
                        
                        return ret;
                    }
                },
                _SolutionData: { Def: null },
                _SolutionDir: { Def: null },
                _ProjectData: { Def: null },
                _ProjectDir: { Def: null },
                _OutputFile: { Def: null },
                __Path: { Def: null },
                __Uglifyjs: { Def: null }
            },
            Name: 'ProjectCompilerBase'
        });
    });
})(JsBedRock.CurrentAssembly);