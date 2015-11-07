JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.ServiceFactory = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.__ServiceCache = new JsBedRock.UI.ServiceCache();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Register: function () {
                   __ServiceCache.PopulateCache();
                },
                GetService: function (key) {
                    var compType = this.__ServiceCache.GetService(key);
                    
                    if(!compType)
                        JsBedRock.Console.Error(key + " does not map to a registered Service.");
                    
                    return new compType(this._BuildServiceContext());
                },
                _BuildServiceContext: function () {
                    return {};
                },
                __ServiceCache: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);