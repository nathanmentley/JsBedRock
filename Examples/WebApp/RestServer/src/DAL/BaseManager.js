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
                        this._Db = new JsBedRock.WebAppExample.DAL.BlogDatabase();
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