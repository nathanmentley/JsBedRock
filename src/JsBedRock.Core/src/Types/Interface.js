window.JsBedRock = window.JsBedRock || {};
JsBedRock.Types = JsBedRock.Types || {};

//JsBedRock.Types
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Types.Interface = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "Interface",
			Members: {
				Init: function () { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);