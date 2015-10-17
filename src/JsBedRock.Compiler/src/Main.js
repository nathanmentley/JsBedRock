(function (asm) {
    asm.OnLoad(function () {
        var newlinechar = "\r\n";
        
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
                    
                    for(var i = 0; i < solutionData.projects.length; i++){
                        var projectFile = solutionData.projects[i];
                        var projectDir = this.__Path.dirname(projectFile);
                        var projectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                        var outputFile = this.__Path.join(projectDir, projectData.outputFile);
                        
                        this.BuildProject(solutionData, projectData, projectDir, outputFile);
                        
                        this.ExecuteUnitTests(projectData, outputFile);
                    }
                },
                BuildProject: function (solutionData, projectData, projectDir, outputFile) {
                    var compiledFile = '';
                    
                    if(projectData.ProjectType !== "ClassLibrary" && projectData.ProjectType != "Flat") {
                        compiledFile = compiledFile + newlinechar + ";" + newlinechar + (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(
                            __dirname + "/sdk/" + solutionData.FrameworkVersion + "/JsBedRock.Framework.js"
                        ).toString();
                    }
                    
                    for (var j = 0; j < projectData.sourceFiles.length; j++){
                        compiledFile = compiledFile + newlinechar + ";" + newlinechar + (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(
                            this.__Path.join(projectDir, projectData.sourceFiles[j])
                        ).toString();
                    }
                    
                    if(projectData.ProjectType !== "Flat") {
                        compiledFile = compiledFile + newlinechar + ";" + newlinechar + (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(
                            __dirname + "/sdk/" + solutionData.FrameworkVersion + "/AssemblyWrappers/" + projectData.ProjectType + ".js"
                        ).toString();
                    }
                    
                    if(!(new JsBedRock.Node.IO.FileSystem()).DirectoryExistsSync(this.__Path.dirname(outputFile))) {
                       (new JsBedRock.Node.IO.FileSystem()).MkDirSync(this.__Path.dirname(outputFile));
                    }
                    
                    if(!JsBedRock.Utils.String.IsEmptyOrSpaces(outputFile))
                        (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(outputFile, compiledFile);        
                },
                ExecuteUnitTests: function (projectData, outputFile) {
                    if(projectData.ProjectType === "TestRunner") {
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
                    }
                },
                __Path: null,
                __ChildProcess: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);