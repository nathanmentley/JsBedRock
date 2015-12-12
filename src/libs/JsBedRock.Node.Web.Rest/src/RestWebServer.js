JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.RestWebServer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.WebServerBase,
            Constructor: function (portNumber, routerType, controllerCacheType, managerCacheType) {
                if(controllerCacheType)
                    this.__ControllerCache = new controllerCacheType();
                else
                    this.__ControllerCache = new JsBedRock.Node.Web.Rest.ControllerCache();
                        
                if(routerType)
                    this.__Router = new routerType();
                else
                    this.__Router = new JsBedRock.Node.Web.Rest.RequestRouter();
                 
                if(managerCacheType)
                    this.__ManagerCache = new managerCacheType(new JsBedRock.Node.Db.Accessors.AccessorLoader());
                else
                    this.__ManagerCache = new JsBedRock.Node.Web.Rest.ManagerCache(new JsBedRock.Node.Db.Accessors.AccessorLoader());
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.WebServerBase, portNumber);
            },
            Members: {
                __ControllerCache: { Def: null },
                __ManagerCache: { Def: null },
                __Router: { Def: null },
                
                ServerStart: {
                    Def: function () {
                        this.__Router.RegisterRoute();
                        this.__ManagerCache.PopulateCache();
                        
                        this.Base();
                    }
                },
                _HandleRequest: {
                    Def: function(req, res) {
                        try {
                            var routerResult = this.__Router.ParseRequest(req.url);
                            
                            var controller = new (this.__ControllerCache.GetController(routerResult.Controller))(this.__ManagerCache, req, res);
                            controller._Init();
                            
                            var actionData = new (this._GetRequestDataTypeFromAction(controller, routerResult.Action))();
                            
                            var fullBody = '';
                            req.on('data', function(chunk) {
                                fullBody += chunk.toString();
                            });
                            
                            req.on('end', function() {
                                if(!JsBedRock.Utils.String.IsEmptyOrSpaces(fullBody))
                                    actionData.FromJson(fullBody);
                                
                                controller[routerResult.Action](actionData).Success(function (data) {
                                    controller._Deinit();
                                    
                                    res.end(data.ToJson());
                                });
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
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);