JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.ServiceFactory = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.__ServiceCache = new JsBedRock.UI.ServiceCache();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Init: {
                    Def: function () {
                        this.__ServiceCache.PopulateCache();
                    }
                },
                GetService: {
                    Def: function (key) {
                        var compType = this.__ServiceCache.GetService(key);
                        
                        if(!compType)
                            JsBedRock.Console.Error(key + " does not map to a registered Service.");
                        
                        return new compType(this._BuildServiceContext());
                    }
                },
                _BuildServiceContext: {
                    Def: function () {
                        return {};
                    }
                },
                __ServiceCache: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);