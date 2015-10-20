JsBedRock.Core = JsBedRock.Core || {};
JsBedRock.Core.Tests = JsBedRock.Core.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Core.Tests.ImplementTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'ImplementTests',
				Test: function () {
                    var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();
                
                    //Test that we've implemented all the interfaces and that we're of the interface types.
                    this.Assert(object3.__Implemented.length === 2, "Implemented both interfaces.");
                
                    this.Assert(object3.__Implemented[0] === JsBedRock.Types.Interface, "Implemented Interface");
                    this.Assert(object3.__Implemented[1] === JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1, "Implemented ITestInterface1");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);