(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.UnitTesting.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.UnitTesting'
			})
		]
	});
})();