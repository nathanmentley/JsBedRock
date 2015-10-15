(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Collections',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Core'
			})
		]
	});
})();