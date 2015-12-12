(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main2 = JsBedRock.Utils.ObjectOriented.CreateClass({
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
	var disposable = vscode.commands.registerCommand('extension.compile', function () {
		if(JsBedRock.Main2) {
			(new JsBedRock.Main2()).DisplayMessage('Compiling: ' + vscode.workspace.rootPath + "/solution.json");
			(new JsBedRock.Compiler.Compiler()).BuildSolution(vscode.workspace.rootPath + "/solution.json");
			(new JsBedRock.Main2()).DisplayMessage('Compiled');
		}else{
			vscode.window.showInformationMessage("JsBedRock... Still Loading.");
		}
	});
	var disposable = vscode.commands.registerCommand('extension.about', function () {
		// The code you place here will be executed every time your command is executed
		if(JsBedRock.Main2){
			(new JsBedRock.Main2()).DisplayMessage('About: Started.');
		}else{
			vscode.window.showInformationMessage("JsBedRock... Still Loading.");
		}
	});
							
	context.subscriptions.push(disposable);
}

exports.activate = active;
