(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: (JsBedRock.Main = function () {
                this._CompFactory = new JsBedRock.UI.ComponentFactory(
                    new JsBedRock.UI.Web.HtmlComponentRenderer(),
                    new JsBedRock.UI.ServiceFactory()
                );
                    
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            }),
            Members: {
				Main: function () {
                    this._CompFactory.Init();
                    
                    var self = this;
                    $(document).ready(function () {
                        document.getElementById("AppBody").innerHTML = 
                            self._CompFactory.GetComponent(JsBedRock.Components.HomePageComponent, {}).Refresh();
                    });
                },
                _CompFactory: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);