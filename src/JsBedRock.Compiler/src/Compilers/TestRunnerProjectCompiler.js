JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.TestRunnerProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                this.__ChildProcess = require('child_process');
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
				CompileProject: function () {
					this.Base();
                    
                    this.__ExecuteUnitTests(this._ProjectData);
                },
                _BuildProject: function () {
                    return this._ConcatFile(
                        (this._ConcatFile('', this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js") + this.Base()),//this.Base(),
                        this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.TestRunner + ".js"
                    );
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
            }
        });
    });
})(JsBedRock.CurrentAssembly);