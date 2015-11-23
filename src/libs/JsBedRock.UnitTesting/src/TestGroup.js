JsBedRock.UnitTesting = JsBedRock.UnitTesting || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UnitTesting.TestGroup = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                TestGroupName: { Def: 'DefaultTestGroup' },
                InitTestGroup: {
                    Def: function () {
                        JsBedRock.Console.Write("Running Test Group: " + this.TestGroupName);
                    }
                },
                DeinitTestGroup: {
                    Def: function () {
                        JsBedRock.Console.Write("Finished Test Group: " + this.TestGroupName);
                    }
                },
                InitTest: {
                    Def: function () {
                    }
                },
                DeinitTest: { Def: function () {
                    }
                },
                Assert: {
                    Def: function(condition, message) {
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
                    }
                },
                GetAttempts: {
                    Def: function () {
                        return this.__Attempts;
                    }
                },
                GetFailures: {
                    Def: function () {
                        return this.__Failures;
                    }
                },
                GetSuccesses: {
                    Def: function () {
                        return this.__Successes;
                    }
                },
                __Attempts: { Def: 0 },
                __Failures: { Def: 0 },
                __Successes: { Def: 0 }
            }
        });
    });
})(JsBedRock.CurrentAssembly);