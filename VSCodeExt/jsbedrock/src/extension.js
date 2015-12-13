(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.VSCodeExt = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				// The module 'vscode' contains the VS Code extensibility API
				this._VsCode = require('vscode');
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                DisplayMessage: {
                    Def: function(message) {
						this._VsCode.window.showInformationMessage(message);
					}
                },
				CompileSolution: {
					Def: function(solution) {
						(new JsBedRock.Compiler.Compiler()).BuildSolution(solution);
					}
				},
				GetSolutionForFile: {
					Def: function(file) {
						var fs = new JsBedRock.Node.IO.FileSystem();
						
						if(JsBedRock.Utils.String.IsEmptyOrSpaces(file))
                            return null;
						
						return this.GetSolutionForPath(fs.GetPathFromFile(file));
					}	
				},
				GetSolutionForPath: {
					Def: function(path) {
						var fs = new JsBedRock.Node.IO.FileSystem();
						
						if(JsBedRock.Utils.String.IsEmptyOrSpaces(path))
                            return null;
							
						if(fs.FileExistsSync(path + fs.GetPathSeperator() + "solution.json"))	
							return path + fs.GetPathSeperator() + "solution.json";
							
						var paths = path.split(fs.GetPathSeperator());
						
                        if(paths.length > 1) {
                            paths.pop();
                            return this.GetSolutionForPath(paths.join(fs.GetPathSeperator()));
                        }
							
						return null;
					}
				},
				_VsCode: {
					Def: null
				}
            }
        });
    });
})(JsBedRock.CurrentAssembly);

var vscode = require('vscode');
function active(context) {		
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//JsBedRock.Console.Write('Congratulations, your extension "jsbedrock" is now active!'); 
						
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('extension.compile', function () {
		if(JsBedRock.VSCodeExt) {
			var vsCodeExt = new JsBedRock.VSCodeExt();
			var solutionFile = vsCodeExt.GetSolutionForFile(vscode.window.activeTextEditor.document.fileName);
			
			if(!JsBedRock.Utils.String.IsEmptyOrSpaces(solutionFile)){			
				vsCodeExt.DisplayMessage('Compiling: ' + solutionFile);
				vsCodeExt.CompileSolution(solutionFile);
				vsCodeExt.DisplayMessage('Compiled');
			}else{
				vsCodeExt.DisplayMessage('No Active Solution To Compile.');
			}
			
		}else{
			vscode.window.showInformationMessage("JsBedRock... Still Loading.");
		}
	}));
			
	context.subscriptions.push(vscode.commands.registerCommand('extension.about', function () {
		// The code you place here will be executed every time your command is executed
		if(JsBedRock.VSCodeExt){
			var vsCodeExt = new JsBedRock.VSCodeExt();
			vsCodeExt.DisplayMessage('JsBedRock. Version: ' + JsBedRock.FrameworkVersion);
		}else{
			vscode.window.showInformationMessage("JsBedRock... Still Loading.");
		}
	}));
}

exports.activate = active;
