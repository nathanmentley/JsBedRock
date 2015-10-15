(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Collections.Generic',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Collections'
			})
		]
	});
})();