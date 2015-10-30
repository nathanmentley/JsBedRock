JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.UI.Web.HtmlComponentRenderer = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.UI.ComponentRenderer,
            Constructor: function (component) {
                this._Html = new JsBedRock.UI.Web.HtmlHelper();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.ComponentRenderer, component);
            },
            Members: {
                Render: function () {
                    this.Base();
                },
                _Html: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);