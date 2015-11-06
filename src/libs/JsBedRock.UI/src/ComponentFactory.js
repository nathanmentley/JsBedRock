JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.ComponentFactory = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.__ComponentCache = new JsBedRock.UI.ComponentCache();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Register: function () {
                   __ComponentCache.PopulateCache();
                },
                GetComponent: function (key) {
                    var compType = this.__ComponentCache.GetComponent(key);
                    
                    if(!compType)
                        JsBedRock.Console.Error(key + " does not map to a registered component.");
                    
                    return new compType(this._BuildComponentContext());
                },
                _BuildComponentContext: function () {
                    return {};
                },
                __ComponentCache: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);