JsBedRock.UI = JsBedRock.UI || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.ComponentFactory = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (renderer, serviceFactory) {
                this.__ComponentRenderer = renderer;
                this.__ServiceFactory = serviceFactory;
                this.__ComponentCache = new JsBedRock.UI.ComponentCache();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Init: {
                    Def: function () {
                        this.__ComponentCache.PopulateCache();
                        this.__ComponentRenderer.Init(this);
                        this.__ServiceFactory.Init();
                    }
                },
                GetComponent: {
                    Def: function (key, context) {
                        var compType = this.__ComponentCache.GetComponent(key);
                        
                        if(!compType)
                            JsBedRock.Console.Error(key + " does not map to a registered component.");
                        
                        var comp = new compType(this._BuildComponentContext(context), this.__ComponentRenderer, this);
                        comp.Init();
                        
                        return comp;
                    }
                },
                GetServiceFactory: {
                    Def: function () {
                        return this.__ServiceFactory;
                    }
                },
                _BuildComponentContext: {
                    Def: function (context) {
                        return JsBedRock.Utils.Object.MergeObjects({}, context);
                    }
                },
                __ComponentCache: { Def: null },
                __ServiceFactory: { Def: null },
                __ComponentRenderer: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);