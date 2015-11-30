JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Rest = JsBedRock.Node.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Web.Rest.RestServerStart = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.WebServerStart,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.WebServerStart);
            },
            Members: {
				Main: {
                    Def: function () {
                        this.Base();
                    }
                },
                _ServerType: {
                    Def: JsBedRock.Node.Web.Rest.RestWebServer
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);