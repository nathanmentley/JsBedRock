JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.StaticFileWebServer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.WebServerBase,
            Constructor: function (portNumber) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.WebServerBase, portNumber);
            },
            Members: {
                _HandleRequest: function(req, res) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end("response");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);