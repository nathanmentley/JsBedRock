(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Compiler',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Node.IO'
			})
		]
	});
})();