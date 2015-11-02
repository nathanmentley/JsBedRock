(function(asm) {
	asm.OnLoad(function () {
		//Entry Point
		(new JsBedRock.Main()).Main();
	});
	
	var fs = require('fs');
	
	var sdkConfgJson = {};
	
	if (process.env.JSBEDROCK_FRAMEWORK_PATH) {
		try{
			sdkConfgJson = JSON.parse(fs.readFileSync(process.env.JSBEDROCK_FRAMEWORK_PATH + '/' + JsBedRock.FrameworkVersion + "/config.json", 'utf8').toString());
		}
		catch(err){
			
		}
	}
	var appConfgJson = JSON.parse(fs.readFileSync(__dirname + "/config.json", 'utf8').toString());
	
	JsBedRock.Assemblies.AssemblyConfig.LoadConfig(
		JsBedRock.Utils.Object.MergeObjects(
			sdkConfgJson,
			appConfgJson
		)
	);
	
	JsBedRock.Assemblies.LoaderLogic = function (u, c){
		var file = __dirname + "/" + u + ".js";
		
		try{
			fs.statSync(file);
		}catch(err){
			if (process.env.JSBEDROCK_FRAMEWORK_PATH)
				file = process.env.JSBEDROCK_FRAMEWORK_PATH + '/' + JsBedRock.FrameworkVersion + "/" + u + ".js";
		}
		
		//TODO: This is awful.
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