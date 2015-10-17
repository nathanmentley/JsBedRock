
;

;
﻿var JsBedRock = {};
JsBedRock.FrameworkVersion = '0.0.1';
;
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
;
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
;
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
;
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
;
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.GlobalAssemblyCache
(function () {
    JsBedRock.Assemblies.GlobalAssemblyCache = JsBedRock.Assemblies.GlobalAssemblyCache || {};
    
	var PrivateMembers = {
		_GAC: {},
        LoadedAsms: [],
        DoesAssemblyExist: function (asmKey) {
		  return asmKey in PrivateMembers._GAC;
        },
        IsAssemblyLoaded: function (asmKey) {
		  return (PrivateMembers.LoadedAsms.indexOf(asmKey) !== -1);
        },
        LoadAssembly: function (asmDep, callback) {
            JsBedRock.Assemblies.LoaderLogic(
                PrivateMembers.GetAssemblyKey(asmDep),
                callback
            );
            
            //add placeholder in GAC.
            PrivateMembers._GAC[PrivateMembers.GetAssemblyKey(asmDep)] = asmDep;
        },
        GetAssemblyKey: function (asmDef) {
            return asmDef.Name;// + '-' + asmDef.Version;
        },
        LoadAssemblyClasses: function (asmDef) {
            JsBedRock.CurrentAssembly = asmDef;    
            for(var i = 0; i < asmDef.Callbacks.length; i++)
                asmDef.Callbacks[i]();
            asmDef.Callbacks = [];
            
            //include in GAC.
            PrivateMembers._GAC[PrivateMembers.GetAssemblyKey(asmDef)] = asmDef;
            PrivateMembers.LoadedAsms.push(PrivateMembers.GetAssemblyKey(asmDef));
        }
	};
    
    JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly = function (asmDef) {
        //Load Dependancies
        for(var i = 0; i < asmDef.Dependencies.length; i++){
            if(!PrivateMembers.DoesAssemblyExist(PrivateMembers.GetAssemblyKey(asmDef.Dependencies[i]))){
                PrivateMembers.LoadAssembly(asmDef.Dependencies[i], function () {
		            setTimeout(function() {
                            JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asmDef);
                        },
                        1
                    );
                });
                return;
            }else if(!PrivateMembers.IsAssemblyLoaded(PrivateMembers.GetAssemblyKey(asmDef.Dependencies[i]))){
		        setTimeout(function() {
                        JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asmDef);
                    },
                    1
                );
                return;
            }
        }
        
        PrivateMembers.LoadAssemblyClasses(asmDef);
    };
})();
;
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDef
(function () {
    JsBedRock.Assemblies.AssemblyDef = function (overrides) {
        var context = this;
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Loaded: false,
                Dependencies: [],
                Callbacks: [],
                Classes: [],
                OnLoad: function(callback) {
                    context.Callbacks.push(callback);
                }
            }
        };
        
        JsBedRock.Utils.Object.MergeObjects(
            context,
            JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides)
        );
        
        JsBedRock.CurrentAssembly = this;
    };
})();
;
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDependency
(function () {
    JsBedRock.Assemblies.AssemblyDependency = function (overrides) { 
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Loaded: false
            }
        };
        
        JsBedRock.Utils.Object.MergeObjects(
            this,
            JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides)
        );
    };
})();
;
(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Compiler',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Node.IO'
			})
		]
	});
})();
;
(function (asm) {
    asm.OnLoad(function () {
        var newlinechar = "\r\n";
        
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                this.__Path = require('path');
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    var solutionFile = process.argv[2];
                    var solutionData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(solutionFile).toString());
                    
                    for(var i = 0; i < solutionData.projects.length; i++){
                        var projectFile = solutionData.projects[i];
                        var projectDir = this.__Path.dirname(projectFile);
                        var projectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                        var outputFile = this.__Path.join(projectDir, projectData.outputFile);
                        
                        var compiledFile = '';
                        for (var j = 0; j < projectData.sourceFiles.length; j++){
                            compiledFile = compiledFile + newlinechar + ";" + newlinechar + (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(
                                this.__Path.join(projectDir, projectData.sourceFiles[j])
                            ).toString();
                        }
                        if(!JsBedRock.Utils.String.IsEmptyOrSpaces(outputFile))
                            (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(outputFile, compiledFile);
                    }
                },
                __Path: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
(function(asm) {
	asm.OnLoad(function () {
		//Entry Point
		(new JsBedRock.Main()).Main();
	});
	
	//TODO: This is awful.
	JsBedRock.Assemblies.LoaderLogic = function (u, c){
		eval(require('fs').readFileSync(__dirname + "/" + u + ".js", 'utf8'));
		
		setTimeout( function() { c(); }, 0 );
	}
	
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);