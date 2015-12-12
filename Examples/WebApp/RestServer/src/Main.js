(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.Rest.RestServerStart,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.Rest.RestServerStart);
            },
            Members: {
                _PortNumber: {
                    Def: JsBedRock.AppConfig.WebServer.PortNumber
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);