(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.UnitTesting',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Core'
			})
		]
	});
})();