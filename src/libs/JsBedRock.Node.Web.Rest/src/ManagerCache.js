JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Web.Rest.ManagerCache = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (accessorLoader) {
                this._AccessorLoader = accessorLoader;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                GetManager: {
                    Def: function (managerType) {
                        if(this._ManagerDictionary == null)
                            this.PopulateCache();
                        
                        if(this._ManagerDictionary.Contains(managerType.prototype.Name))
                            return this._ManagerDictionary.Get(managerType.prototype.Name);
                        return null;
                    }
                },
                PopulateCache: {
                    Def: function () {
                        this._ManagerDictionary = new JsBedRock.Collections.Dictionary();
                    
                        var managers = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(JsBedRock.CurrentAssembly, JsBedRock.Node.Web.Rest.Manager);
                            
                        for(var i = 0; i < managers.length; i++) {
                            var key = managers[i].prototype.Name;
                            
                            if (!this._ManagerDictionary.Contains(key)) {
                                this._ManagerDictionary.Add(key, new managers[i](this._AccessorLoader));
                            }
                        }
                    }
                },
                _AccessorLoader: { Def: null },
				_ManagerDictionary: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);