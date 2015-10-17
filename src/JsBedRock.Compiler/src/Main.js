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
                        
                        var compiledFile = '';
                        for (var j = 0; j < projectData.sourceFiles.length; j++){
                            compiledFile = compiledFile + newlinechar + ";" + newlinechar + (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(
                                this.__Path.join(projectDir, projectData.sourceFiles[j])
                            ).toString();
                        }
                        
                        if(!JsBedRock.Utils.String.IsEmptyOrSpaces(outputFile))
                            (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(outputFile, compiledFile);
                            
                        if(projectData.IsUnitTestProject)
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