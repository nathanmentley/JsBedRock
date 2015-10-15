window.JsBedRock = window.JsBedRock || {};
JsBedRock.Types = JsBedRock.Types || {};

//JsBedRock.Types
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Types.Interface = (function () {
			var interfaceDef = function () {
				/// <summary>Base Interface Type. JsBedRock.Types.Object Implements this interface.</summary>
				/// <returns type="JsBedRock.Types.Interface">Interface Definition</returns>
			};
	
			interfaceDef.InterfaceName = "Interface";
	
			interfaceDef.prototype = {
				Init: function () { },
				Name: ''
			};
	
			return interfaceDef;
		})();
	});
})(JsBedRock.CurrentAssembly);