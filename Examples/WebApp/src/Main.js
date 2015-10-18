(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: (JsBedRock.Main = function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            }),
            Members: {
				Main: function () {
                    var test = new WebApp.TestClasses.TwiceInheritedClass();
                    test.TestMethod();
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);