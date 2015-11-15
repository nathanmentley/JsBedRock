(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    var webServer = new JsBedRock.Web.Rest.RestWebServer(JsBedRock.AppConfig.WebServer.PortNumber);
                    
                    webServer.ServerStart();
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);