JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Web.Rest.RestWebServer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Web.WebServerBase,
            Constructor: function (portNumber) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.WebServerBase, portNumber);
            },
            Members: {
                __ControllerCache: null,
                __Router: null,
                __RouterType: null,
                __ControllerCacheType: null,
                
                ServerStart: function () {
                    if(this.__ControllerCacheType)
                        this.__ControllerCache = new __ControllerCacheType();
                    else
                        this.__ControllerCache = new JsBedRock.Web.Rest.ControllerCache();
                        
                    if(this.__RouterType)
                        this.__Router = new __RouterType();
                    else
                        this.__Router = new JsBedRock.Web.Rest.RequestRouter();
                
                    this.Base();
                },
                ServerEnd: function (callback) {
                    this.Base(callback);
                },
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
                RegisterRouter: function (routerType) {
                    this.__RouterType = routerType;
                },
                RegisterControllerCache: function (controllerCacheType) {
                    this.__ControllerCache = controllerCacheType;
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);