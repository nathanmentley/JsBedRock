window.WebApp = window.WebApp ||{};
WebApp.TestClasses = WebApp.TestClasses || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: (WebApp.TestClasses.Base = function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            }),
            Members: {
				TestMethod: function () {
                    JsBedRock.Console.Write("Base");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);