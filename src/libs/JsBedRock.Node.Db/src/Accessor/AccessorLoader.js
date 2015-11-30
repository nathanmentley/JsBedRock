JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.Accessors = JsBedRock.Node.Db.Accessors || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Db.Accessors.AccessorLoader = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this._AccessorCache = new JsBedRock.Collections.Dictionary();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Load: {
                    Def: function(accessorType) {
                        if(!this._AccessorCache.Contains(accessorType))
                            this._AccessorCache.Add(accessorType, new accessorType());
                        
                        return this._AccessorCache.Get(accessorType);
                    }
                },
                _AccessorCache: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);