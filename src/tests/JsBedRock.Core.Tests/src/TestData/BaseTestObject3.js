JsBedRock.Tests = JsBedRock.Tests || {};
JsBedRock.Tests.Utils = JsBedRock.Tests.Utils || {};
JsBedRock.Tests.Utils.ObjectOriented = JsBedRock.Tests.Utils.ObjectOriented || {};

(function (asm) {
    asm.OnLoad(function () {
            JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3 = JsBedRock.Utils.ObjectOriented.CreateClass({
                Inherit: JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2,
                Constructor: function () {
                    JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2);
                },
                Implements: [
                    JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1
                ],
                Members: {
                    Name: { Def: "BaseTestObject3" },
                    TestMethod: {
                        Def: function (var1) {
                            var1 = this.Base(var1);
                            return var1 + 10;
                        }
                    },
                    TestMethod3: { Def: function () { return 'b'; } }
                }
            });
    });
})(JsBedRock.CurrentAssembly);