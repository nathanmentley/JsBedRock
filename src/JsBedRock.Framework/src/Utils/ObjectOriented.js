JsBedRock.Utils = JsBedRock.Utils || {};

//JsBedRock.Utils.ObjectOriented
(function () {
    JsBedRock.Utils.ObjectOriented = JsBedRock.Utils.ObjectOriented || {};
	var PrivateMembers = {
        ObjectDefBuilder: function (_constructor) {
            /// <summary>Takes an object constructor function and returns a class definition.</summary>
            /// <param name="_constructor" type="function">The CTOR function.</param>
            /// <returns type="function">Class definition function.</returns>
    
            if (typeof _constructor != 'function')
                JsBedRock.Console.Error("Invalid Constructor. Cannot create object definition.");
    
            //Setup any methods that all objects should have.
            // GetType
            _constructor.prototype.GetType = function () { return _constructor; };
            // GetAssembly
            var classAssembly = JsBedRock.CurrentAssembly;
            _constructor.prototype.GetAssembly = function () { return classAssembly; }
    
            return _constructor;
        },
        Inherit: function (_cls, _superCls) {
            /// <summary>Inherits an object from a class definition.</summary>
            /// <param name="_cls" type="JsBedRock.Types.Object Type">The class def to inherit to.</param>
            /// <param name="_superCls" type="JsBedRock.Types.Object Type">Class Def to inherit from.</param>
            
            //save GetType. Or else it'll be incorrectly overwritten.
            // TODO: This should probably save any methods defined in ObjectDefBuilder
            var getTypeDef = _cls.prototype.GetType;
    
            //Copy the prototype from the super class.
            var construct = function () { };
            construct.prototype = _superCls.prototype;
            _cls.prototype = new construct;
            _cls.prototype.constructor = _cls;
    
            //restore GetType
            _cls.prototype.GetType = getTypeDef;
            
            //these are public, but they start with __ because VisualStudio's intellisense hides javascript members that start with _.
            //This pattern supports single inheritance chain... So an array is good. No need for worrying about two parents.
            _cls.prototype.__InheritanceChain = _cls.prototype.__InheritanceChain || [];
            _cls.prototype.__InheritanceChain.unshift(_superCls);
        },
        Implement: function (_cls, _interface) {
            /// <summary>Ensures an interface is Implemented on an object and marks the object as implemented.</summary>
            /// <param name="_cls" type="JsBedRock.Types.Object Type">The class def to inherit to.</param>
            /// <param name="_interface" type="JsBedRock.Types.Interface Type">Class Def to inherit from.</param>
    
            _cls.prototype.__Implemented = _cls.prototype.__Implemented || [];
    
            //If interface is already Implemented Skip.
            if (_cls.prototype.__Implemented.indexOf(_interface) !== -1)
                return;
    
            for (reqPubilcs in _interface.prototype) {
                //If the instance doesn't have a definition for anything in the Interface's prototype we should blow up.
                if (!_cls.prototype[reqPubilcs]) {
                    JsBedRock.Console.Error(reqPubilcs + ' not implemented on ' + _cls.prototype.Name + ' for ' + _interface.InterfaceName + '.');
                }
            }
    
            //if everything is defined we should add the interface def to the __Implemented array.
            _cls.prototype.__Implemented.push(_interface);
        },
        ClassDefaults: {
            Inherit: null,
            Implements: [],
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {}
        },
        InterfaceDefaults: {
            Name: '',
            Members: {}
        }
    };
    
    JsBedRock.Utils.ObjectOriented.CreateClass = function (overrides) {
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.ClassDefaults, overrides);
        var classDef = PrivateMembers.ObjectDefBuilder(values.Constructor);
        
        if (values.Inherit === null) {
            if (JsBedRock.Types.Object) {
                PrivateMembers.Inherit(classDef, JsBedRock.Types.Object);
            }
        } else {
            PrivateMembers.Inherit(classDef, values.Inherit);
        }
        
        for(var prop in values.Members)
            classDef.prototype[prop] = values.Members[prop];
        
        for(var i = 0; i < values.Implements.length; i++)
            PrivateMembers.Implement(classDef, values.Implements[i]);
            
        //LinkClass To Assembly
        JsBedRock.CurrentAssembly.Classes.push(classDef);
         
        return classDef;
    };
    
    JsBedRock.Utils.ObjectOriented.CreateInterface = function (overrides) {
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.InterfaceDefaults, overrides);
        
        var interfaceDef = function () {};
	
		interfaceDef.InterfaceName = values.Name;
	
        for(var prop in values.Members)
            interfaceDef.prototype[prop] = values.Members[prop];
	
		return interfaceDef;
    };
	
    JsBedRock.Utils.ObjectOriented.IsOfType = function (_instance, _type) {
        /// <summary>Checks if an JsBedRock.Types.Object Instance inherits or implements from a JsBedRock.Types.Interface Type or JsBedRock.Types.Object Type.</summary>
        /// <param name="_instance" type="JsBedRock.Types.Object Instance">The class instance to inherit to.</param>
        /// <param name="_type" type="JsBedRock.Types.Object or JsBedRock.Types.Interface Type">Class Def to inherit from.</param>
        /// <returns type="Boolean">True if is the instance is in face of the passed Type.</returns>

        //if this is an instance of the type return true. This will get actual instances and inherited types.
        if (_instance instanceof _type)
            return true;

        //If the interface is in the implemented array we should return true.
		if(_instance.__Implemented instanceof Array)
			for(var i = 0; i < _instance.__Implemented.length; i++)
				if(_instance.__Implemented[i] === _type)
				    return true;

		return false;
	};
	
    JsBedRock.Utils.ObjectOriented.CallBaseConstructor = function (_instance, _superCls) {
        /// <summary>Executes the instances inherited constructor.</summary>
        /// <param name="_instance" type="JsBedRock.Types.Object Instance">The class instance to inherit to.</param>
        /// <param name="_superCls" type="JsBedRock.Types.Object Type">Class Def of the inherited class.</param>
        /// <param name="param[]" type="any">Any parameters for the base constructor should be included after.</param>

        //Get any arguments and set them up.
        var args = Array.prototype.slice.call(arguments);

        //Apply the _superCls def function on the instance. 
        _superCls.apply(_instance, args.slice(2, args.length));
    };
})();