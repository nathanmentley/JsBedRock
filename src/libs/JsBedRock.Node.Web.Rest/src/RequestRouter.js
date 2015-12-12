JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.RequestRouter = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this._RouteDictionary = new JsBedRock.Collections.Dictionary();
                this._RouterResultDictionary = new JsBedRock.Collections.Dictionary();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                ParseRequest: {
                    Def: function(uri) {
                        var route = this._RouteDictionary.Get(uri);
                        var result = this._RouterResultDictionary.Get(route);
                        return result;
                    }
                },
                RegisterRoute: {
                    Def: function() {
                        var controllers = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(JsBedRock.CurrentAssembly, JsBedRock.Node.Web.Rest.Controller);
                            
                        for(var i = 0; i < controllers.length; i++) {
                            var controllerInstance = new controllers[i]();
                            
                            for(var action in controllerInstance) {
                                if(controllerInstance[action]) {
                                    var attribute = controllerInstance.GetAttribute(action, JsBedRock.Node.Web.Rest.ResponseTypeAttribute);
                                    if(attribute) {
                                        var requestTypeInstance = new (attribute.Type)();
                                        var routeDef = requestTypeInstance.GetClassAttribute(JsBedRock.Web.Rest.RestRequestRouteAttribute);
                                        if(routeDef) {
                                            if (!this._RouteDictionary.Contains(routeDef.Route)) {
                                                this._RouteDictionary.Add(routeDef.Route, attribute.Type);
                                            }
                                            
                                            this._RouterResultDictionary.Add(
                                                attribute.Type,
                                                new JsBedRock.Node.Web.Rest.RequestRouterResult(
                                                    controllerInstance.Name,
                                                    action,
                                                    attribute.Type
                                                )
                                            );
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                _RouteDictionary: {
                    Def: null
                },
                _RouterResultDictionary: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);