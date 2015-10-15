window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Collections.IEnumerable = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IEnumerable",
			Members: {
				GetEnumerator: function () { },
			}
		});
	});
})(JsBedRock.CurrentAssembly);