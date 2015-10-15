(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Collections.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.UnitTesting'
			}),
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Collections'
			})
		]
	});
})();