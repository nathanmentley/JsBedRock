window.JsBedRock = window.JsBedRock || {};
JsBedRock.Utils = JsBedRock.Utils || {};
JsBedRock.Utils.ObjectOriented = JsBedRock.Utils.ObjectOriented || {};
JsBedRock.Utils.ObjectOriented.Reflection = JsBedRock.Utils.ObjectOriented.Reflection || {};

//JsBedRock.Utils.ObjectOriented.Reflection
(function () {
	var PrivateMembers = {};
    JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName = function (_instance, _value) {
        /// <summary>Returns the method name on an Object Instance of the passed value.</summary>
        /// <param name="instance" type="JsBedRock.Utils.ObjectOriented.Object">The instance with the method.</param>
        /// <param name="value" type="function">The value of the function.</param>
        var methodName;
        //Look through every property on the instance... and compare the value.
        for (var prop in _instance) {
            if (_instance[prop] === _value) {
                methodName = prop;
                break;
            }
        }
        //If we still haven't found the match let's check inherited properties.
        if (JsBedRock.Utils.String.IsEmptyOrSpaces(methodName)) {
            for (var key in _instance.__InheritanceChain) {
                for (var prop in _instance.__InheritanceChain[key].prototype) {
                    if (_instance.__InheritanceChain[key].prototype[prop] === _value) {
                        methodName = prop;
                        break;
                    }
                }
            }
        }
        return methodName;
    };
    JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType = function (_assembly, _type) {
        var ret = [];
        
        for(var i = 0; i < _assembly.Classes.length; i++){
            var instance = new _assembly.Classes[i]();
            if(JsBedRock.Utils.ObjectOriented.IsOfType(instance, _type))
                ret.push(_assembly.Classes[i]);
        }
        
        return ret;
    };
})();