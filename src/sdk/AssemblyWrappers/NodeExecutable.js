(function(asm) {
	asm.OnLoad(function () {
		//Entry Point
	});
	
	//TODO: This is awful.
	JsBedRock.Assemblies.LoaderLogic = function (u, c){
		eval(require('fs').readFileSync(u, 'utf8'));
		c();
	}
	
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);