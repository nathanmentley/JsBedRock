(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: '{{Name}}',
		Dependencies: [ {{Dependencies}} ],
		NodeDependencies: [ {{NodeDependencies}} ]
	});
})();