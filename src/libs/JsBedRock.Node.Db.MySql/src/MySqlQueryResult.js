JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.MySql = JsBedRock.Node.Db.MySql || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Db.MySql.MySqlQueryResult = JsBedRock.Utils.ObjectOriented.CreateClass({
			Implements: [
				JsBedRock.Node.Db.IQueryResult
			],
            Constructor: function (rows, fields) {
                this._Rows = rows;
                this._Fields = fields;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				GetCursor: {
                    Def: function () {
                        return this._Rows;
                    }
                },
                _Rows: {
                    Def: null
                },
                _Fields: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);