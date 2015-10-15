(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Collections.Generic.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Collections.Generic'
			})
		]
	});
})();