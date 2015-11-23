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
                __ControllerCache: { Def: null },
                __Router: { Def: null },
                
                _HandleRequest: {
                    Def: function(req, res) {
                        try {
                            var routerResult = this.__Router.ParseRequest(req.url);
                            
                            var controller = new (this.__ControllerCache.GetController(routerResult.Controller))(req, res);
                            controller._WriteHeader();
                            
                            var action = controller[routerResult.Action];
                            var actionData = new (this._GetRequestDataTypeFromAction(controller, action))();
                            
                            var fullBody = '';
                            req.on('data', function(chunk) {
                                fullBody += chunk.toString();
                            });
                            
                            req.on('end', function() {
                                if(!JsBedRock.Utils.String.IsEmptyOrSpaces(fullBody))
                                    actionData.FromJson(fullBody);
                                
                                res.end(action(actionData).ToJson());
                            });
                        } catch(err) {
                            res.end("Exception:" + err.message + " " + err.stack);
                        }
                    }
                },
                _GetRequestDataTypeFromAction: {
                    Def: function (controller, action) {
                        var attr = controller.GetAttribute(action, JsBedRock.Node.Web.Rest.ResponseTypeAttribute);
                        
                        if (attr)
                            return attr.Type;
                        
                        return JsBedRock.Web.Rest.RestRequest;
                    }
                },
                GetRouter: {
                    Def: function () {
                        return this.__Router;
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);