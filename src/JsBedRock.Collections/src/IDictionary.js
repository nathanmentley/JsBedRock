window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Collections.IDictionary = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IDictionary",
			Members: {
				Add: function (key, item) { },
				Clear: function () { },
				Contains: function (key) { },
				Get: function (key) { },
				Remove: function (key) { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);