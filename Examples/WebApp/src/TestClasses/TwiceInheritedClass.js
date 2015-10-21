window.WebApp = window.WebApp ||{};
WebApp.TestClasses = WebApp.TestClasses || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: (WebApp.TestClasses.TwiceInheritedClass = function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, WebApp.TestClasses.OnceInheritedClass);
            }),
            Inherit: WebApp.TestClasses.OnceInheritedClass,
            Members: {
				TestMethod: function () {
                    JsBedRock.Console.Write("TwiceInheritedClass");
                    this.Base();
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly)