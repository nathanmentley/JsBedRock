JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.DAL = JsBedRock.WebAppExample.DAL || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.DAL.BaseManager = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                _Init: {
                    Def: function () {
                        this._Db = new JsBedRock.Node.Db.MySql.MySqlConnection(
                            JsBedRock.AppConfig.DbServer.Host,
                            JsBedRock.AppConfig.DbServer.User,
                            JsBedRock.AppConfig.DbServer.Password,
                            JsBedRock.AppConfig.DbServer.Database
                        );
                        this._Db.Connect();
                    }
                },
                _Deinit: {
                    Def: function () {
                        this._Db.Disconnect();
                    }
                },
                _Db: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);