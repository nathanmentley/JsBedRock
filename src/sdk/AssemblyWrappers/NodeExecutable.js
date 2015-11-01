(function(asm) {
	asm.OnLoad(function () {
		//Entry Point
		(new JsBedRock.Main()).Main();
	});
	
	var fs = require('fs');
	
	var sdkConfgJson = {};
	
	if (process.env.JSBEDROCK_SDK_PATH)
		sdkConfgJson = JSON.parse(fs.readFileSync(process.env.JSBEDROCK_SDK_PATH + '/' + JsBedRock.FrameworkVersion + "/config.json", 'utf8').toString());
	var appConfgJson = JSON.parse(fs.readFileSync(__dirname + "/config.json", 'utf8').toString());
	
	JsBedRock.Assemblies.AssemblyConfig.LoadConfig(
		JsBedRock.Utils.Object.MergeObjects(
			sdkConfgJson,
			appConfgJson
		)
	);
	
	//TODO: This is awful.
	JsBedRock.Assemblies.LoaderLogic = function (u, c){
		var file = __dirname + "/" + u + ".js";
		
		//if no file
		//file = process.env.JSBEDROCK_SDK_PATH + '/' + JsBedRock.FrameworkVersion + "/" + u + ".js";
		
		eval(fs.readFileSync(file, 'utf8'));
		
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