JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};
JsBedRock.Node.Db.MySql = JsBedRock.Node.Db.MySql || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Node.Db.MySql.MySqlEntityFieldAttribute = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Types.Attribute,
            Constructor: function (fieldName, fieldType) {
                this.SqlFieldName = fieldName;
                this.SqlFieldType = fieldType;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Attribute);
            },
            Members: {
                SqlFieldName: {
                    Def: null
                },
                SqlFieldType: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);