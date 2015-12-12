JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.Db = JsBedRock.Node.Db || {};

//JsBedRock.Node.Db
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Node.Db.IQueryResult = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IQueryResult",
			Members: {
				GetCursor: function () { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);