JsBedRock.Tests = JsBedRock.Tests || {};
JsBedRock.Tests.Utils = JsBedRock.Tests.Utils || {};
JsBedRock.Tests.Utils.ObjectOriented = JsBedRock.Tests.Utils.ObjectOriented || {};

(function (asm) {
    asm.OnLoad(function () {
            JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1 = JsBedRock.Utils.ObjectOriented.CreateClass({
                Inherit: JsBedRock.Types.Object,
                Constructor: function () {
                    JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
                },
                Members: {
                    Name: "BaseTestObject1",
                    TestMethod: function (var1) {
                        return ++var1;
                    }
                }
            });
    });
})(JsBedRock.CurrentAssembly);