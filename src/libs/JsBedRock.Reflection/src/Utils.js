JsBedRock.Reflection = JsBedRock.Reflection || {};

(function () {
	var PrivateMembers = {};
    
    JsBedRock.Reflection.GetMethodName = function (_instance, _value) {
        return JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(_instance, _value);
    };
    
    JsBedRock.Reflection.GetClassesOfType = function (_assembly, _type) {
        return JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(_assembly, _type);
    };
    
    JsBedRock.Reflection.GetClassAttribute = function (_type, _attributeType) {
        return JsBedRock.Reflection.GetAttribute(_type, "", _attributeType);
    };
    
    JsBedRock.Reflection.GetAttribute = function (_type, _target, _attributeType) {
        if(!_type.prototype.__Attributes[_target])
            return null;
        for(var i = 0; i < _type.prototype.__Attributes[_target].length; i++) {
            if(_type.prototype.__Attributes[_target][i])
                if(JsBedRock.Utils.ObjectOriented.IsOfType(_type.prototype.__Attributes[_target][i], _attributeType))
                    return _type.prototype.__Attributes[_target][i];
        }
        return null;
    };
    
    JsBedRock.Reflection.GetMethodsFromType = function (_type) {
        var ret = new JsBedRock.Collections.List();
        
        if(_type) {
            if(_type.prototype) {
                for(var prop in _type.prototype) {
                    if(typeof(_type.prototype[prop]) === "function") {
                        ret.Add(prop);
                    }
                }
            }
        }
        
        return ret;
    };
    
    JsBedRock.Reflection.GetPropertiesFromType = function (_type) {
        var ret = new JsBedRock.Collections.List();
        
        if(_type) {
            if(_type.prototype) {
                for(var prop in _type.prototype) {
                    if(typeof(_type.prototype[prop]) !== "function") {
                        ret.Add(prop);
                    }
                }
            }
        }
        
        return ret;
    };
})();