JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.MySql = JsBedRock.Node.Db.MySql || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Db.MySql.MySqlEntityDatabaseBase = JsBedRock.Utils.ObjectOriented.CreateClass({
			Implements: [
				JsBedRock.IDisposable
			],
            Constructor: function (host, user, password, database) {
				this.__Connection = new JsBedRock.Node.Db.MySql.MySqlConnection(host, user, password, database);
                this.__QueryableDictionary = new JsBedRock.Collections.Dictionary();
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Dispose: {
                    Def: function () {
                        this.__Connection.Disconnect();
                    }
                },
                _GetQueryable: {
                    Def: function (modelType) {
                        if(!this.__Connection.IsConnected) {
                            this.__Connection.Connect();
                        }
                        
                        if(!this.__QueryableDictionary.Contains(modelType)) {
                            this.__QueryableDictionary.Add(
                                modelType,
                                new JsBedRock.Node.Db.MySql.MySqlQueryable(modelType, this.__Connection)
                            );
                        }
                        
                        return this.__QueryableDictionary.Get(modelType);
                    }
                },
                __QueryableDictionary: {
                    Def: null
                },
				__Connection: {
					Def: null
				}
            }
        });
    });
})(JsBedRock.CurrentAssembly);