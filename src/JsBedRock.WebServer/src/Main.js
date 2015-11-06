(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    JsBedRock.Console.Write("Init Web Server");
                    var webServer = new JsBedRock.Web.Rest.RestWebServer(JsBedRock.AppConfig.WebServer.PortNumber);
                    
                    JsBedRock.Console.Write("Starting Web Server");
                    webServer.ServerStart();
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);