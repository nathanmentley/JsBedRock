(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Node.IO',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Core'
			})
		]
	});
})();