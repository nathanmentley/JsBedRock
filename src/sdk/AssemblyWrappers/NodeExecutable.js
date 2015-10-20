(function(asm) {
	asm.OnLoad(function () {
		//Entry Point
		(new JsBedRock.Main()).Main();
	});
	
	//TODO: This is awful.
	JsBedRock.Assemblies.LoaderLogic = function (u, c){
		eval(require('fs').readFileSync(__dirname + "/" + u + ".js", 'utf8'));
		
		setTimeout( function() { c(); }, 0 );
	}
	
	require('child_process').exec('npm install npm', function (error, stdout, stderr) {
		var npm = require("npm");
		npm.load(function (err) {
			npm.commands.install(asm.NodeDependencies, function (er, data) {
				// log the error or data
				JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
			});
			npm.on("log", function (message) {
				// log the progress of the installation
				console.log(message);
			});
		});
    });
})(JsBedRock.CurrentAssembly);