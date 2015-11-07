JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Rest.RestWebServer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Web.WebServerBase,
            Constructor: function (portNumber) {
                this.__ControllerCache = new JsBedRock.Web.Rest.ControllerCache();
                this.__Router = new JsBedRock.Web.Rest.RequestRouter();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.WebServerBase, portNumber);
            },
            Members: {
                _HandleRequest: function(req, res) {
                    try {
                        var routerResult = this.__Router.ParseRequest(req.url);
                        
                        var controllerType = this.__ControllerCache.GetController(routerResult.Controller);
                        var controller = new controllerType();
                        
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end(controller[routerResult.Action]().ToJson());
                    } catch(err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end("Exception:" + err.message + " " + err.stack);
                    }
                },
                __ControllerCache: null,
                __Router: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);