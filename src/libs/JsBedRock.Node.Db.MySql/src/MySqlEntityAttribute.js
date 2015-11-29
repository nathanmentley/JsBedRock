JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.MySql = JsBedRock.Node.Db.MySql || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Db.MySql.MySqlEntityAttribute = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Types.Attribute,
            Constructor: function (entityName) {
                this.SqlTableName = entityName;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Attribute);
            },
            Members: {
                SqlTableName: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);