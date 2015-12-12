JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Web.WebAppRouter = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                LoadRoutes: {
                    Def: function (routes) {
                        this._Routes = routes;
                    }
                },
                ParseRouteResult: {
                    Def: function () {
                        var url = document.location.toString();
                        
                        if (url.indexOf("#") != -1)
                        {
                            var comp = url.split("#")[1];
                            var parts = comp.split("/");
                            
                            if(this._Routes.Contains(parts[0])) {
                                return new JsBedRock.UI.Web.WebAppRouterResult(
                                    this._Routes.Get(parts[0]).Component,
                                    this._BuildContext(parts[0], parts)
                                );
                            }
                        }
                        
                        return new JsBedRock.UI.Web.WebAppRouterResult(
                            this._Routes.Get("Default").Component,
                            this._BuildContext("Default", parts)
                        );
                    }
                },
                _BuildContext: {
                    Def: function (routeKey, routeData) {
                        if (routeData) {
                            if (routeData instanceof Array) {
                                if(routeData.length > 1) {
                                    var routeDef = this._Routes.Get(routeKey);
                                    
                                    if(routeDef) {
                                        routeData.shift();
                                        
                                        var ret = {};
                                        for(var key in routeDef.Context){
                                            if(routeData.length >= key) {
                                                ret[routeDef.Context[key]] = routeData[key];
                                            }
                                        }
                                        return ret;
                                    }
                                }
                            }
                        }
                        
                        return {}
                    }
                },
                _Routes: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);