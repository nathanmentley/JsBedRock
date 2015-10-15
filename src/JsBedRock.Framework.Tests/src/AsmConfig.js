(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Framework.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.UnitTesting'
			})
		]
	});
})();