JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Web = JsBedRock.Node.Web || {};
JsBedRock.Node.Web.Rest = JsBedRock.Node.Web.Rest || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Node.Web.Rest.Controller = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (managerCache, request, response) {
                this._ManagerCache = managerCache;
                this._Request = request;
                this._Response = response;
                
                this._Manager = {};
                
                this._WriteHeader();
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Name: { Def: 'controller' },
                _Init: {
                    Def: function () {
                        var managers = this._GetManagers();
                        
                        for(var i = 0; i < managers.length; i++) {
                            this._Manager[managers[i].prototype.Name] = this._ManagerCache.GetManager(managers[i]);
                        }
                    }
                },
                _Deinit: {
                    Def: function () {
                        
                    }
                },
                _WriteHeader: {
                    Def: function () {
                        if(this._Response) {
                            this._Response.writeHead(200, { });
                        }
                    }
                 },
                _GetManagers: {
                    Def: function () {
                        return [];
                    }
                },
                _ManagerCache: { Def: null },
                _Manager: { Def: null },
                _Request: { Def: null },
                _Response: { Def: null }
            }
        });
    });
})(JsBedRock.CurrentAssembly);