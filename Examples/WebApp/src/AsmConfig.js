var WebApp = {};

(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'WebApp',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Core'
			})
		]
	});
})();