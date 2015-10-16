(function(asm) {
	asm.OnLoad(function () {
		//Entry Point
	});
	
	//TODO: This is awful.
	JsBedRock.Assemblies.LoaderLogic = function (u, c){
		var d = document;
		var t = 'script';
		var o = d.createElement(t);
        var s = d.getElementsByTagName(t)[0];
        
		o.src = u;
        if (c)
			o.addEventListener('load', function (e) { c(null, e); }, false);
		
        s.parentNode.insertBefore(o, s);
	}
	
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);