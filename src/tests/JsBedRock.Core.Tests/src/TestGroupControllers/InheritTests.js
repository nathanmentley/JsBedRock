JsBedRock.Core = JsBedRock.Core || {};
JsBedRock.Core.Tests = JsBedRock.Core.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Core.Tests.InheritTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: { Def: 'InheritTests' },
				Test: {
                    Def: function () {
                        var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();
                    
                        //Test that we're inherited all three sub types.
                        this.Assert(object3.__InheritanceChain.length === 3, "BaseTestObject3 correctly inherited three sub classes")
                    
                        this.Assert(object3.__InheritanceChain[0] === JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2, "Inherited BaseTestObject2");
                        this.Assert(object3.__InheritanceChain[1] === JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1, "Inherited BaseTestObject1");
                        this.Assert(object3.__InheritanceChain[2] === JsBedRock.Types.Object, "Inherited Object");
                    
                        //Test that we're inheriting methods.
                        this.Assert(object3.TestMethod2(2) === 7, "Method Inherited Correctly.");
                    
                        //Test that we're overriding methods correctly.
                        this.Assert(object3.TestMethod3() === 'b', "Method Overriden Correctly.");
                    
                        //Test overriden methods correctly handle this.Base(0);
                        this.Assert(object3.TestMethod(3) === 14, "this.Base() executed previously defined method the correct number of times.");
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);