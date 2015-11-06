JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        var PrivateMembers = {
            GetKeyFromComponentType: function (componentType) {
                return componentType;
            }
        };
        
        JsBedRock.UI.ComponentCache = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				this._ComponentDictionary = new JsBedRock.Collections.Dictionary();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                PopulateCache: function () {
                    //Reflection Get all components and add them to dictionary
                    var gac = JsBedRock.Assemblies.GlobalAssemblyCache.GetLoadedAssemblies();
                    for (var prop in gac) {
                        var components = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(gac[prop], JsBedRock.UI.Component);
                        
                        for(var i = 0; i < components.length; i++) {
                            var key = PrivateMembers.GetKeyFromComponentType(components[i]);
                            
                            if(key) {
                                if (!this._ComponentDictionary.Contains(key)) {
                                    this._ComponentDictionary.Add(key, components[i]);
                                }
                            }
                        }
                    }
                },
                GetComponent: function (key) {
                    if(this._ComponentDictionary.Contains(key))
                        return this._ComponentDictionary.Get(key);
                    return null;
                },
				_ComponentDictionary: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);