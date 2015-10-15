(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Collections.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Collections'
			})
		]
	});
})();