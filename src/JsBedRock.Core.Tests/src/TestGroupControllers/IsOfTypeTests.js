JsBedRock.Core = JsBedRock.Core || {};
JsBedRock.Core.Tests = JsBedRock.Core.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Core.Tests.IsOfTypeTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'IsOfTypeTests',
				Test: function () {
                    var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();
                
                    //Test that we're inherited all three sub types and that we're of the expected type.
                    this.Assert(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3), "IsOfType BaseTestObject3");
                    this.Assert(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2), "IsOfType BaseTestObject2");
                    this.Assert(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1), "IsOfType BaseTestObject1");
                    this.Assert(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1), "IsOfType ITestInterface1");
                    this.Assert(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Types.Object), "IsOfType Object");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);