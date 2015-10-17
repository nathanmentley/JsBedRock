(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Node.IO.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.UnitTesting'
			}),
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Node.IO'
			})
		]
	});
})();