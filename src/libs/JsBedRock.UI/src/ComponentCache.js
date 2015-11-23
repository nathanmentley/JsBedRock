JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        var PrivateMembers = {
            GetKeyFromComponentType: function (componentType) {
                return componentType.prototype.Name;
            }
        };
        
        JsBedRock.UI.ComponentCache = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				this._ComponentDictionary = new JsBedRock.Collections.Dictionary();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                PopulateCache: {
                    Def: function () {
                        //Reflection Get all components and add them to dictionary
                        var components = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(JsBedRock.CurrentAssembly, JsBedRock.UI.Component);
                            
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
                GetComponent: {
                    Def: function (compType) {
                        if(this._ComponentDictionary.Contains(PrivateMembers.GetKeyFromComponentType(compType)))
                            return this._ComponentDictionary.Get(PrivateMembers.GetKeyFromComponentType(compType));
                        return null;
                    }
                },
                GetComponentFromKey: {
                    Def: function (key) {
                        if(this._ComponentDictionary.Contains(key))
                            return this._ComponentDictionary.Get(key);
                        return null;
                    }
                },
                GetComponents: {
                    Def: function () {
                        return this._ComponentDictionary.GetEnumerator();
                    }
                },
				_ComponentDictionary: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);