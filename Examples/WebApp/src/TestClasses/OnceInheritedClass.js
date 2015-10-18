WebApp.TestClasses = WebApp.TestClasses || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: (WebApp.TestClasses.OnceInheritedClass = function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, WebApp.TestClasses.Base);
            }),
            Inherit: WebApp.TestClasses.Base,
            Members: {
				TestMethod: function () {
                    JsBedRock.Console.Write("OnceInheritedClass");
                    this.Base();
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly)