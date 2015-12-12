JsBedRock.Tests = JsBedRock.Tests || {};
JsBedRock.Tests.Utils = JsBedRock.Tests.Utils || {};
JsBedRock.Tests.Utils.ObjectOriented = JsBedRock.Tests.Utils.ObjectOriented || {};

(function (asm) {
    asm.OnLoad(function () {
            JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2 = JsBedRock.Utils.ObjectOriented.CreateClass({
                Inherit: JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1,
                Constructor: function () {
                    JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1);
                },
                Members: {
                    Name: { Def: "BaseTestObject2" },
                    TestMethod2: { Def: function (var1) { return var1 + 5; } },
                    TestMethod3: { Def: function () { return 'a'; } }
                }
            });
    });
})(JsBedRock.CurrentAssembly);