JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: (JsBedRock.Compiler.TestRunnerProjectCompiler = function (soultionData, solutionFile, projectData, projectFile) {
                this.__ChildProcess = require('child_process');
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, solutionFile, projectData, projectFile);
            }),
            Members: {
				CompileProject: function () {
					this.Base();
                    
                    this.__ExecuteUnitTests(this._ProjectData);
                },
                _GetSourceFiles: function () {
                    var ret = this.Base();
                    
                    ret.push(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.TestRunner + ".js");
                    
                    return ret;
                },
                __ExecuteUnitTests: function (projectData) {
                    this.__ChildProcess.exec('node ' + this._OutputFile, function (error, stdout, stderr) { 
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
                __ChildProcess: null
            },
            Name: 'TestRunnerProjectCompiler'
        });
    });
})(JsBedRock.CurrentAssembly);