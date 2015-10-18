JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        var PrivateStatics = {
            ProjectTypes: {
                Assets: "Assets",
                Flat: "Flat",
                ClassLibrary: "ClassLibrary",
                TestRunner: "TestRunner",
                BrowserExecutable: "BrowserExecutable",
                NodeExecutable: "NodeExecutable"
            },
            NewLineChar: "\r\n"
        };
        
        JsBedRock.Compiler.ProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (soultionData, projectFile) {
                this.__Path = require('path');
                this.__ChildProcess = require('child_process');
                this.__SettingResolver = new JsBedRock.Compiler.SettingResolver();
                
                this._SolutionData = soultionData;
                this._ProjectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                this._ProjectDir = this.__Path.dirname(projectFile);
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				CompileProject: function () {
                    var outputFile = this.__Path.join(this._ProjectDir, this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._ProjectData.OutputFile));
                        
                    JsBedRock.Console.Write(this._ProjectData.Name + ": Building Project");
                    if (this._ProjectData.ProjectType === PrivateStatics.ProjectTypes.Assets) {
                        this._PopulateAssestProject(this._SolutionData, this._ProjectData, this._ProjectDir, outputFile);
                    } else {
                        this._BuildProject(this._SolutionData, this._ProjectData, this._ProjectDir, outputFile);
                        
                        if (this._ProjectData.ProjectType === PrivateStatics.ProjectTypes.TestRunner)
                            this._ExecuteUnitTests(this._ProjectData, outputFile);
                    }
                    JsBedRock.Console.Write(this._ProjectData.Name + ": Successfully Built");
                },
                _PopulateAssestProject: function (solutionData, projectData, projectDir, outputFile) {
                    for (var j = 0; j < projectData.SourceFiles.length; j++){
                        var targetFile = this.__Path.join(outputFile, projectData.SourceFiles[j]);
                        this._EnsureDirectoryExists(this.__Path.dirname(targetFile));
                    
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            this.__Path.join(projectDir, projectData.SourceFiles[j]),
                            targetFile
                        );
                    }
                },
                _BuildProject: function (solutionData, projectData, projectDir, outputFile) {
                    var compiledFile = '';
                    
                    if(projectData.ProjectType !== PrivateStatics.ProjectTypes.ClassLibrary && projectData.ProjectType != PrivateStatics.ProjectTypes.Flat) {
                        compiledFile = this._ConcatFile(compiledFile, this._GetSdkLocation(solutionData) + "JsBedRock.Framework.js");
                    }
                    
                    for (var j = 0; j < projectData.SourceFiles.length; j++){
                        compiledFile = this._ConcatFile(compiledFile, this.__Path.join(projectDir, projectData.SourceFiles[j]));
                    }
                    
                    if(projectData.ProjectType !== "Flat") {
                        compiledFile = this._ConcatFile(
                            compiledFile,
                            this._GetSdkLocation(solutionData) + "AssemblyWrappers/" + projectData.ProjectType + ".js"
                        );
                    }
                    
                    this._EnsureDirectoryExists(this.__Path.dirname(outputFile));
                    
                    if(!JsBedRock.Utils.String.IsEmptyOrSpaces(outputFile))
                        (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(outputFile, compiledFile);        
                },
                _ExecuteUnitTests: function (projectData, outputFile) {
                    this.__ChildProcess.exec('node ' + outputFile, function (error, stdout, stderr) { 
                        if (error) {
                            JsBedRock.Console.Write(error.stack);
                            JsBedRock.Console.Write('Error code: '+error.code);
                            JsBedRock.Console.Write('Signal received: '+error.signal);
                            throw error;
                        }
                        if(!JsBedRock.Utils.String.IsEmptyOrSpaces(stdout))
                            JsBedRock.Console.Write('Child Process STDOUT: '+stdout);
                        if(!JsBedRock.Utils.String.IsEmptyOrSpaces(stderr))
                            JsBedRock.Console.Write('Child Process STDERR: '+stderr);
                    });
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
                __Path: null,
                __ChildProcess: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);