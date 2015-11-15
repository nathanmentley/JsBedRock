JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.RestWebServer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.WebServerBase,
            Constructor: function (portNumber, routerType, controllerCacheType) {
                if(controllerCacheType)
                    this.__ControllerCache = new controllerCacheType();
                else
                    this.__ControllerCache = new JsBedRock.Node.Web.Rest.ControllerCache();
                        
                if(routerType)
                    this.__Router = new routerType();
                else
                    this.__Router = new JsBedRock.Node.Web.Rest.RequestRouter();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.WebServerBase, portNumber);
            },
            Members: {
                __ControllerCache: null,
                __Router: null,
                
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
                GetRouter: function () {
                    return this.__Router;
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);