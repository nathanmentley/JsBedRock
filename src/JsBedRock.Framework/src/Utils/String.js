window.JsBedRock = window.JsBedRock || {};
JsBedRock.Utils = JsBedRock.Utils || {};

//JsBedRock.Utils.String
(function () {
	var PrivateMembers = {};
    JsBedRock.Utils.String = JsBedRock.Utils.String || {};
	
    JsBedRock.Utils.String.IsEmptyOrSpaces = function (_str) {
        /// <summary>Null/Empty/Whitespace check on strings..</summary>
        /// <param name="_str" type="string">The string to check.</param>
        /// <returns type="Boolean">Returns true if the string is null, empty, or whitespace.</returns>
        return _str == null || _str.trim() === '';
    };
})();