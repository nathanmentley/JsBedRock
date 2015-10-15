window.JsBedRock = window.JsBedRock || {};
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
                InitTest: function (testMethod) {
                    JsBedRock.Console.Info("Running Test: " + testMethod.Name + " From Test Group: " + this.TestGroupName);
                },
                DeinitTest: function (testMethod) {
                    JsBedRock.Console.Info("Finished Test: " + testMethod.Name + " From Test Group: " + this.TestGroupName);
                },
                Assert: function(testMethod, condition, message) {
                    if(!condition)
                        JsBedRock.Console.Error(testMethod.Name + " failed: " + message);
                        
                    return condition;
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);