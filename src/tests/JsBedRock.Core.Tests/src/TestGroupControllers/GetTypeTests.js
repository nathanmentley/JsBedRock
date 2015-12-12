JsBedRock.Core = JsBedRock.Core || {};
JsBedRock.Core.Tests = JsBedRock.Core.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Core.Tests.GetTypeTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: { Def: 'GetTypeTests' },
				Test: {
                    Def: function () {
                        this.Assert(
                            new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3().GetType() === JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3,
                            "BaseTestObject3 -> GetType returned correct object def"
                        );
                        this.Assert(
                            new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2().GetType() === JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2,
                            "BaseTestObject2 -> GetType returned correct object def"
                        );
                        this.Assert(
                            new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1().GetType() === JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1,
                            "BaseTestObject1 -> GetType returned correct object def"
                        );
                        this.Assert(
                            new JsBedRock.Types.Object().GetType() === JsBedRock.Types.Object,
                            "Object -> GetType returned correct object def"
                        );
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);