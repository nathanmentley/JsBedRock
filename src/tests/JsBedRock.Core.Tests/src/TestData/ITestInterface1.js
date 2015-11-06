JsBedRock.Tests = JsBedRock.Tests || {};
JsBedRock.Tests.Utils = JsBedRock.Tests.Utils || {};
JsBedRock.Tests.Utils.ObjectOriented = JsBedRock.Tests.Utils.ObjectOriented || {};

(function (asm) {
    asm.OnLoad(function () {
            JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1 = JsBedRock.Utils.ObjectOriented.CreateInterface({
                Name: "ITestInterface1",
                Members: {
                    TestMethod: function () { },
                    TestMethod2: function () { },
                    TestMethod3: function () { }
                }
            });
    });
})(JsBedRock.CurrentAssembly);