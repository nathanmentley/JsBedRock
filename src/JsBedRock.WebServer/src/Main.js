(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    JsBedRock.Console.Write("Starting Web Server");
                    
                    var webServer = new JsBedRock.Web.WebServerBase(8080);
                    webServer.ServerStart();
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);