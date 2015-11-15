(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: (JsBedRock.Main = function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            }),
            Members: {
				Main: function () {
                    var action = "new WebApp.TestClasses.TwiceInheritedClass().TestMethod();";
                    var element = (new JsBedRock.UI.Web.Dom()).CreateElement("Button", { onclick: action });
                    document.body.appendChild(element);
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);