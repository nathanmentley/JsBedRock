
;
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
;
JsBedRock.UnitTesting = JsBedRock.UnitTesting || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UnitTesting.TestGroup = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                TestGroupName: 'DefaultTestGroup',
                InitTestGroup: function () {
                    JsBedRock.Console.Info("Running Test Group: " + this.TestGroupName);
                },
                DeinitTestGroup: function () {
                    JsBedRock.Console.Info("Finished Test Group: " + this.TestGroupName);
                },
                InitTest: function () {
                },
                DeinitTest: function () {
                },
                Assert: function(condition, message) {
                    var methodName = JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(this, arguments.callee.caller);
                    this.__Attempts++;
                    
                    if(!condition){
                        JsBedRock.Console.Info(this.TestGroupName + "->" + methodName + "->" + message + " failed");
                        this.__Failures++;
                    }else{
                        JsBedRock.Console.Info(this.TestGroupName + "->" + methodName + "->" + message + " passed");
                        this.__Successes++;
                    }
                        
                    return condition;
                },
                GetAttempts: function () {
                    return this.__Attempts;
                },
                GetFailures: function () {
                    return this.__Failures;
                },
                GetSuccesses: function () {
                    return this.__Successes;
                },
                __Attempts: 0,
                __Failures: 0,
                __Successes: 0
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
(function(asm) {
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);