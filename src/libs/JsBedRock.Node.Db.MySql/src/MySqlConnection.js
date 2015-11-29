JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.MySql = JsBedRock.Node.Db.MySql || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Db.MySql.MySqlConnection = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (host, user, password, database) {
				this.__MySql = require('mysql');
				
				this._Host = host;
				this._User = user;
				this._Password = password;
				this._Database = database;
				
				this.IsConnected = false;
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Connect: {
                    Def: function () {
						if (!this.IsConnected) {
							this.IsConnected = true;
							
							this.__Connection = this.__MySql.createConnection({
								host: this._Host,
								user: this._User,
								password: this._Password,
								database: this._Database
							});
							this.__Connection.connect();
						}
                    }
                },
				Query: {
					Def: function (query) {
						var promise = new JsBedRock.Promise();
						
						this.__Connection.query(query, function (err, rows, fields) {
							if(!err){
								promise.Resolve(new JsBedRock.Node.Db.MySql.MySqlQueryResult(rows, fields));
							}else{
								promise.Reject(error);
							}
						});
						
						return promise;
					}
				},
				Disconnect: {
					Def: function () {
						if(this.IsConnected) {
							this.IsConnected = false;
							
							this.__Connection.end();
						}
					}
				},
				IsConnected: {
					Def: null
				},
				_Host: {
					Def: null
				},
				_User: {
					Def: null
				},
				_Password: {
					Def: null
				},
				_Database: {
					Def: null
				},
				__MySql: {
					Def: null
				},
				__Connection: {
					Def: null
				}
            }
        });
    });
})(JsBedRock.CurrentAssembly);