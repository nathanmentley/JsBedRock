(function(asm) {
	asm.OnLoad(function () {
		JsBedRock.Console.EnableDebugging();
		
		var testClasses = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(asm, JsBedRock.UnitTesting.TestGroup);
		
		for(var i = 0; i < testClasses.length; i++) {
			var instance = new testClasses[i]();
			
			instance.InitTestGroup();
			
			for (var j = 0; j < Object.keys(testClasses[i].prototype).length; j++) {
				if(!(Object.keys(testClasses[i].prototype)[j] in JsBedRock.UnitTesting.TestGroup.prototype)) {
					instance.InitTest();
					instance[Object.keys(testClasses[i].prototype)[j]]();
					instance.DeinitTest();
				}
			}
			
			instance.DeinitTestGroup();
			
			JsBedRock.Console.Info(instance.TestGroupName + " results: " + instance.GetSuccesses() + " / " + instance.GetAttempts() + " passed tests.");
			
			if (instance.GetFailures() > 0){
				JsBedRock.Console.Error("Unit Tests Failed. See log for details.");
			}
		}
	});
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);