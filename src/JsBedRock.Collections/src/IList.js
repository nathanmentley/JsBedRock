window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};

//JsBedRock.Collections
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Collections.IList = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "IList",
			Members: {
				Add: function (item) { },
				Clear: function () { },
				Count: function () { },
				Contains: function (item) { },
				IndexOf: function (item) { },
				Insert: function (index, item) { },
				Remove: function (item) { },
				RemoveAt: function (index) { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);