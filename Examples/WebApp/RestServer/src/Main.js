(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    var webServer = new JsBedRock.Node.Web.Rest.RestWebServer(JsBedRock.AppConfig.WebServer.PortNumber);
                    
                    webServer.GetRouter().RegisterRoute({});
                    
                    webServer.ServerStart();
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);