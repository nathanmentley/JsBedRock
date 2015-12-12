JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.DAL = JsBedRock.WebAppExample.DAL || {};
JsBedRock.WebAppExample.DAL.Models = JsBedRock.WebAppExample.DAL.Models || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.DAL.Models.BlogPost = JsBedRock.Utils.ObjectOriented.CreateClass({
            Attributes: [
                new JsBedRock.Node.Db.MySql.MySqlEntityAttribute("BlogPosts")
            ],
            Inherit: JsBedRock.Node.Db.MySql.MySqlEntityModelBase,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Db.MySql.MySqlEntityModelBase);
            },
            Members: {
                ID: {
                    Attributes: [
                        new JsBedRock.Node.Db.MySql.MySqlEntityFieldAttribute("id", JsBedRock.Node.Db.MySql.FieldTypes.Int)
                    ],
                    Def: null
                },
                Subject: {
                    Attributes: [
                        new JsBedRock.Node.Db.MySql.MySqlEntityFieldAttribute("Subject", JsBedRock.Node.Db.MySql.FieldTypes.Text)
                    ],
                    Def: null
                },
                Content: {
                    Attributes: [
                        new JsBedRock.Node.Db.MySql.MySqlEntityFieldAttribute("Content", JsBedRock.Node.Db.MySql.FieldTypes.Text)
                    ],
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);