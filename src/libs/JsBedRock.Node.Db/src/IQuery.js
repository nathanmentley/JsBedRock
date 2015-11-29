JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};

//JsBedRock.Node.Db
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Node.Db.IQuery = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IQuery",
			Members: {
				Execute: function () { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);