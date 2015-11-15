(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: (JsBedRock.Main = function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            }),
            Members: {
				Main: function () {
                    this._CompFactory = new JsBedRock.UI.ComponentFactory(new JsBedRock.UI.Web.HtmlComponentRenderer());
                    this._CompFactory.Init();
                    
                    this._CompFactory.GetComponent(JsBedRock.Components.MainLayoutComponent, { TargetId: "#AppBody" }).Render();
                },
                _CompFactory: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);