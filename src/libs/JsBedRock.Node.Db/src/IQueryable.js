JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};

//JsBedRock.Node.Db
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Node.Db.IQueryable = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IQueryable",
			Members: {
				Execute: function () { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);