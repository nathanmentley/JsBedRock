window.JsBedRock = window.JsBedRock || {};
JsBedRock.Utils = JsBedRock.Utils || {};

//JsBedRock.Utils.Object
(function () {
    JsBedRock.Utils.Object = JsBedRock.Utils.Object || {};
	var PrivateMembers = {};
	
	JsBedRock.Utils.Object.MergeObjects = function (defaults, overrides) {
		for(var prop in overrides)
			defaults[prop] = overrides[prop];
		return defaults;
	};
})();