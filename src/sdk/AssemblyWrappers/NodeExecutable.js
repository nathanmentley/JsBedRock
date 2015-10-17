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
	
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);