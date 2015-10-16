JsBedRock.Core = JsBedRock.Core || {};
JsBedRock.Core.Tests = JsBedRock.Core.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Core.Tests.ReflectionGetMethodNameTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'ReflectionGetMethodNameTests',
				Test: function () {
                    var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();
                
                    this.Assert(
                        JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(
                            object3,
                            JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3.prototype.TestMethod3
                        ) === "TestMethod3",
                        "Reflected method name from method declared on the instance"
                    );
                
                    this.Assert(
                        JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(
                            object3,
                            JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2.prototype.TestMethod2
                        ) === "TestMethod2",
                        "Reflected method name from method inherited onto the instance"
                    );
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);