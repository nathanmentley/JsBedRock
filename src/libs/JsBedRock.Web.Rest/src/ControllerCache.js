JsBedRock.Web = JsBedRock.Web || {};
JsBedRock.Web.Rest = JsBedRock.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
        var PrivateMembers = {
            GetKeyFromControllerType: function (controllerType) {
                return (new controllerType()).Name;
            }
        };
        
        JsBedRock.Web.Rest.ControllerCache = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                GetController: function (key) {
                    if(this._ControllerDictionary == null)
                        this.PopulateCache();
                    
                    if(this._ControllerDictionary.Contains(key))
                        return this._ControllerDictionary.Get(key);
                    return null;
                },
                PopulateCache: function () {
				    this._ControllerDictionary = new JsBedRock.Collections.Dictionary();
                
                    var controllers = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(JsBedRock.CurrentAssembly, JsBedRock.Web.Rest.Controller);
                        
                    for(var i = 0; i < controllers.length; i++) {
                        var key = PrivateMembers.GetKeyFromControllerType(controllers[i]);
                        
                        if(key) {
                            if (!this._ControllerDictionary.Contains(key)) {
                                this._ControllerDictionary.Add(key, controllers[i]);
                            }
                        }
                    }
                },
				_ControllerDictionary: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);