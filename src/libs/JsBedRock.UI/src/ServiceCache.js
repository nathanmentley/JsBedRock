JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.ServiceCache = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				this._ServiceDictionary = new JsBedRock.Collections.Dictionary();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                PopulateCache: function () {
                    var services = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(JsBedRock.CurrentAssembly, JsBedRock.UI.Service);
                        
                    for(var i = 0; i < services.length; i++) {
                        var key = JsBedRock.UI.Utils.GetKeyFromServiceType(services[i]);
                            
                        if(key) {
                            if (!this._ServiceDictionary.Contains(key)) {
                                this._ServiceDictionary.Add(key, services[i]);
                            }
                        }
                    }
                },
                GetService: function (key) {
                    if(this._ServiceDictionary.Contains(JsBedRock.UI.Utils.GetKeyFromServiceType(key)))
                        return this._ServiceDictionary.Get(JsBedRock.UI.Utils.GetKeyFromServiceType(key));
                    return null;
                },
				_ServiceDictionary: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);