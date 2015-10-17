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
        
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.__Path = require('path');
                this.__ChildProcess = require('child_process');
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    var solutionFile = process.argv[2];
                    var solutionData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(solutionFile).toString());
                    
                    for(var i = 0; i < solutionData.Projects.length; i++){
                        var projectFile = this.ResolveSetting(solutionData, solutionData.Projects[i]);
                        var projectDir = this.__Path.dirname(projectFile);
                        var projectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                        var outputFile = this.__Path.join(projectDir, this.ResolveSetting(solutionData, projectData.OutputFile));
                        
                        if (projectData.ProjectType === PrivateStatics.ProjectTypes.Assets) {
                            this.PopulateAssestProject(solutionData, projectData, projectDir, outputFile);
                        } else {
                            this.BuildProject(solutionData, projectData, projectDir, outputFile);
                        
                            if (projectData.ProjectType === PrivateStatics.ProjectTypes.TestRunner)
                                this.ExecuteUnitTests(projectData, outputFile);
                        }
                    }
                },
                PopulateAssestProject: function (solutionData, projectData, projectDir, outputFile) {
                    for (var j = 0; j < projectData.SourceFiles.length; j++){
                        var targetFile = this.__Path.join(outputFile, projectData.SourceFiles[j]);
                        this.EnsureDirectoryExists(this.__Path.dirname(targetFile));
                    
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            this.__Path.join(projectDir, projectData.SourceFiles[j]),
                            targetFile
                        );
                    }
                },
                BuildProject: function (solutionData, projectData, projectDir, outputFile) {
                    var compiledFile = '';
                    
                    if(projectData.ProjectType !== PrivateStatics.ProjectTypes.ClassLibrary && projectData.ProjectType != PrivateStatics.ProjectTypes.Flat) {
                        compiledFile = this._ConcatFile(compiledFile, this.GetSdkLocation(solutionData) + "JsBedRock.Framework.js");
                    }
                    
                    for (var j = 0; j < projectData.SourceFiles.length; j++){
                        compiledFile = this._ConcatFile(compiledFile, this.__Path.join(projectDir, projectData.SourceFiles[j]));
                    }
                    
                    if(projectData.ProjectType !== "Flat") {
                        compiledFile = this._ConcatFile(
                            compiledFile,
                            this.GetSdkLocation(solutionData) + "AssemblyWrappers/" + projectData.ProjectType + ".js"
                        );
                    }
                    
                    this.EnsureDirectoryExists(this.__Path.dirname(outputFile));
                    
                    if(!JsBedRock.Utils.String.IsEmptyOrSpaces(outputFile))
                        (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(outputFile, compiledFile);        
                },
                ExecuteUnitTests: function (projectData, outputFile) {
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
                EnsureDirectoryExists: function(directory) {
                    var paths = directory.split(this.__Path.sep);
                    
                    if(paths.length > 1) {
                        paths.pop();
                        this.EnsureDirectoryExists(paths.join(this.__Path.sep));
                    }
                    
                    if(!(new JsBedRock.Node.IO.FileSystem()).DirectoryExistsSync(directory)) {
                       (new JsBedRock.Node.IO.FileSystem()).MkDirSync(directory);
                    }
                },
                GetSdkLocation: function (solutionData) {
                    if(JsBedRock.Utils.String.IsEmptyOrSpaces(solutionData.SDKLocationOverride))
                        return __dirname + "/sdk/" + this.ResolveSetting(solutionData, solutionData.FrameworkVersion) + "/";
                        
                    return this.ResolveSetting(solutionData, solutionData.SDKLocationOverride);
                },
                ResolveSetting: function (solutionData, value) {
                    return value.replace(/{{.*?}}/g, function myFunction(x){return solutionData[x.substring(2, x.length - 2)]; });
                },
                _ConcatFile: function (currentFile, fileToAdd) {
                    return currentFile + PrivateStatics.NewLineChar + ";" + PrivateStatics.NewLineChar +
                        (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(fileToAdd).toString();
                },
                __Path: null,
                __ChildProcess: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);