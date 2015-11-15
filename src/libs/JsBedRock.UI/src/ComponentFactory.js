JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.ComponentFactory = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (renderer) {
                this.__ComponentRenderer = renderer;
                this.__ComponentCache = new JsBedRock.UI.ComponentCache();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Init: function () {
                    this.__ComponentCache.PopulateCache();
                },
                GetComponent: function (key, context) {
                    var compType = this.__ComponentCache.GetComponent(key);
                    
                    if(!compType)
                        JsBedRock.Console.Error(key + " does not map to a registered component.");
                    
                    var comp = new compType(this._BuildComponentContext(context), this.__ComponentRenderer, this);
                    
                    comp.Init();
                    return comp;
                },
                _BuildComponentContext: function (context) {
                    return JsBedRock.Utils.Object.MergeObjects({}, context);
                },
                __ComponentCache: null,
                __ComponentRenderer: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);