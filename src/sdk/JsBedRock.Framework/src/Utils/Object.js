JsBedRock.Utils = JsBedRock.Utils || {};

//JsBedRock.Utils.Object
(function () {
    JsBedRock.Utils.Object = JsBedRock.Utils.Object || {};
	var PrivateMembers = {};
	
	JsBedRock.Utils.Object.MergeObjects = function (defaults, overrides) {
		var ret = {};
		
		for(var prop in defaults)
			ret[prop] = defaults[prop];
			
		for(var prop in overrides)
			ret[prop] = overrides[prop];
			
		return ret;
	};
})();