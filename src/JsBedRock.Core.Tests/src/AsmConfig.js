(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Core.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.UnitTesting'
			}),
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Core'
			})
		]
	});
})();