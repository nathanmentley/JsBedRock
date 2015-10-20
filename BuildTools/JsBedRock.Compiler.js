
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
		var ret = {};
		
		for(var prop in defaults)
			ret[prop] = defaults[prop];
			
		for(var prop in overrides)
			ret[prop] = overrides[prop];
			
		return ret;
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
            var getAsmDef = _cls.prototype.GetAssembly;
    
            //Copy the prototype from the super class.
            _cls.prototype = {};
            for(var prop in _superCls.prototype)
                _cls.prototype[prop] = _superCls.prototype[prop] instanceof Array ? _superCls.prototype[prop].slice() : _superCls.prototype[prop];
                
            //restore GetType
            _cls.prototype.GetType = getTypeDef;
            _cls.prototype.GetAssembly = getAsmDef;
            
            //these are public, but they start with __ because VisualStudio's intellisense hides javascript members that start with _.
            //This pattern supports single inheritance chain... So an array is good. No need for worrying about two parents.
            _cls.prototype.__InheritanceChain = _cls.prototype.__InheritanceChain || [];
            
            _cls.prototype.__InheritanceChain.push(_superCls);
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
        
        for(var inheritedTypeKey in _instance.__InheritanceChain)
            if (_type === _instance.__InheritanceChain[inheritedTypeKey])
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
        
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides);
        
        for(var prop in values)
            context[prop] = values[prop];
        
        JsBedRock.CurrentAssembly = this;
    };
})();
;
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDependency
(function () {
    JsBedRock.Assemblies.AssemblyDependency = function (overrides) {
        var context = this;
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Loaded: false
            }
        };
        
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides);
        
        for(var prop in values)
            context[prop] = values[prop];
    };
})();(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Compiler',
		Dependencies: [ new JsBedRock.Assemblies.AssemblyDependency({ Name: 'JsBedRock.Node.IO' }),new JsBedRock.Assemblies.AssemblyDependency({ Name: 'JsBedRock.Core' }) ]
	});
})();
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.SettingResolver = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (soultionData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                ResolveSolutionSetting: function (solutionData, value) {
                    return value.replace(/{{.*?}}/g, function myFunction(x){return solutionData[x.substring(2, x.length - 2)]; });
                },
                ResolveProjectSetting: function (projectData, value) {
                    return value.replace(/{{.*?}}/g, function myFunction(x){
                        var settingKey = x.substring(2, x.length - 2);
                        
                        switch(settingKey) {
                            case 'Dependencies':
                                var deps = projectData[settingKey];
                                var ret = '';
                                
                                for(var i = 0; i < deps.length; i++) {
                                    ret += "new JsBedRock.Assemblies.AssemblyDependency({ Name: '" + deps[i] + "' }),";
                                }
                                
                                return ret.substring(0, ret.length - 1);
                            default:
                                return projectData[settingKey];
                        }
                    });
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.ProjectTypes = {
            Assets: "Assets",
            Flat: "Flat",
            ClassLibrary: "ClassLibrary",
            TestRunner: "TestRunner",
            BrowserExecutable: "BrowserExecutable",
            NodeExecutable: "NodeExecutable"
        };
	});
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        var PrivateStatics = {
            NewLineChar: "\r\n"
        };
        
        JsBedRock.Compiler.ProjectCompilerBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function (soultionData, projectData, projectFile) {
                this.__Path = require('path');
                this.__SettingResolver = new JsBedRock.Compiler.SettingResolver();
                
                this._SolutionData = soultionData;
                this._ProjectData = projectData;
                this._ProjectDir = this.__Path.dirname(projectFile);
                this._OutputFile = this.__Path.join(this._ProjectDir, this.__SettingResolver.ResolveSolutionSetting(this._SolutionData, this._ProjectData.OutputFile));
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				CompileProject: function () {
                    this._WriteOutputFile(
                        this._BuildProject()
                    );
                },
                _BuildProject: function () {
                    var compiledFile = '';
                    
                    for (var j = 0; j < this._ProjectData.SourceFiles.length; j++){
                        compiledFile = this._ConcatFile(compiledFile, this.__Path.join(this._ProjectDir, this._ProjectData.SourceFiles[j]));
                    }
                    
                    return compiledFile;
                },
                _WriteOutputFile: function(compiledFile) {
                    this._EnsureDirectoryExists(this.__Path.dirname(this._OutputFile));
                    
                    if(!JsBedRock.Utils.String.IsEmptyOrSpaces(this._OutputFile))
                        (new JsBedRock.Node.IO.FileSystem()).WriteFileSync(this._OutputFile, compiledFile);   
                },
                _EnsureDirectoryExists: function(directory) {
                    var paths = directory.split(this.__Path.sep);
                    
                    if(paths.length > 1) {
                        paths.pop();
                        this._EnsureDirectoryExists(paths.join(this.__Path.sep));
                    }
                    
                    if(!(new JsBedRock.Node.IO.FileSystem()).DirectoryExistsSync(directory)) {
                       (new JsBedRock.Node.IO.FileSystem()).MkDirSync(directory);
                    }
                },
                _GetSdkLocation: function (solutionData) {
                    if(JsBedRock.Utils.String.IsEmptyOrSpaces(solutionData.SDKLocationOverride))
                        return __dirname + "/sdk/" + this.__SettingResolver.ResolveSolutionSetting(solutionData, solutionData.FrameworkVersion) + "/";
                        
                    return this.__SettingResolver.ResolveSolutionSetting(solutionData, solutionData.SDKLocationOverride);
                },
                _ConcatFile: function (currentFile, fileToAdd) {
                    return currentFile + PrivateStatics.NewLineChar + ";" + PrivateStatics.NewLineChar +
                        (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(fileToAdd).toString();
                },
                _SolutionData: null,
                _ProjectData: null,
                _ProjectDir: null,
                _OutputFile: null,
                __Path: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.ExecutableProjectCompilerBase = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Compiler.ProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
				CompileProject: function () {
                    this.Base();
                    
                    this._CopyDependencies();
                },
                _BuildProject: function () {
                    var asmConfig = (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/AsmConfig.js").toString();
                    
                    return this._ConcatFile('', this._GetSdkLocation(this._SolutionData) + "JsBedRock.Framework.js") +
                        this._ResolveAsmConfig(asmConfig) +
                        this.Base();
                },
                _ResolveAsmConfig: function(asmConfig) {
                    return this.__SettingResolver.ResolveProjectSetting(this._ProjectData, asmConfig);
                },
                _CopyDependencies: function() {
                    //TODO: Support non framework dependencies.
                    var outputPath = this.__Path.dirname(this._OutputFile);
                    
                    for(var i =0; i < this._ProjectData.Dependencies.length; i++) {
                        var sourceFile = this._GetSdkLocation(this._SolutionData) + this._ProjectData.Dependencies[i] + ".js";
                        var targetFile = outputPath + '/' + this._ProjectData.Dependencies[i] + ".js";
                        
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            sourceFile,
                            targetFile
                        );
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.AssetProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
                CompileProject: function () {
                    for (var j = 0; j < this._ProjectData.SourceFiles.length; j++){
                        var targetFile = this.__Path.join(this._OutputFile, this._ProjectData.SourceFiles[j]);
                        this._EnsureDirectoryExists(this.__Path.dirname(targetFile));
                    
                        (new JsBedRock.Node.IO.FileSystem()).CopyFile(
                            this.__Path.join(this._ProjectDir, this._ProjectData.SourceFiles[j]),
                            targetFile
                        );
                    }
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.BrowserExecutableProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
                _BuildProject: function () {
                    return this._ConcatFile(
                        this.Base(),
                        this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.BrowserExecutable + ".js"
                    );
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.ClassLibraryProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
                _BuildProject: function () {
                    var asmConfig = (new JsBedRock.Node.IO.FileSystem()).ReadFileSync(this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/AsmConfig.js").toString();
                    
                    return this._ResolveAsmConfig(asmConfig) +
                        this._ConcatFile(
                            this.Base(),
                            this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.ClassLibrary + ".js"
                        );
                },
                _ResolveAsmConfig: function(asmConfig) {
                    return this.__SettingResolver.ResolveProjectSetting(this._ProjectData, asmConfig);
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.NodeExecutableProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
                _BuildProject: function () {
                    return this._ConcatFile(
                        this.Base(),
                        this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.NodeExecutable + ".js"
                    );
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Compiler = JsBedRock.Compiler || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Compiler.TestRunnerProjectCompiler = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.Compiler.ExecutableProjectCompilerBase,
            Constructor: function (soultionData, projectData, projectFile) {
                this.__ChildProcess = require('child_process');
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Compiler.ExecutableProjectCompilerBase, soultionData, projectData, projectFile);
            },
            Members: {
				CompileProject: function () {
					this.Base();
                    
                    this.__ExecuteUnitTests(this._ProjectData);
                },
                _BuildProject: function () {
                    return this._ConcatFile(
                        this.Base(),
                        this._GetSdkLocation(this._SolutionData) + "AssemblyWrappers/" + JsBedRock.Compiler.ProjectTypes.TestRunner + ".js"
                    );
                },
                __ExecuteUnitTests: function (projectData) {
                    this.__ChildProcess.exec('node ' + this._OutputFile, function (error, stdout, stderr) { 
                        if (error) {
                            JsBedRock.Console.Write(error.stack);
                            JsBedRock.Console.Write('Error code: '+error.code);
                            JsBedRock.Console.Write('Signal received: '+error.signal);
                            throw error;
                        }
                        if(!JsBedRock.Utils.String.IsEmptyOrSpaces(stdout))
                            JsBedRock.Console.Write('Child Process STDOUT: '+stdout);
                        if(!JsBedRock.Utils.String.IsEmptyOrSpaces(stderr))
                            JsBedRock.Console.Write('Child Process STDERR: '+stderr);
                    });
                },
                __ChildProcess: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				Main: function () {
                    var settingResolver = new JsBedRock.Compiler.SettingResolver();
                    
                    var solutionFile = process.argv[2];
                    var solutionData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(solutionFile).toString());
                    
                    for(var i = 0; i < solutionData.Projects.length; i++){
                        var projectFile = settingResolver.ResolveSolutionSetting(solutionData, solutionData.Projects[i]);
                        var projectData = JSON.parse((new JsBedRock.Node.IO.FileSystem()).ReadFileSync(projectFile).toString());
                        
                        var projectCompiler = this.ProjectCompilerFactory(solutionData, projectData, projectFile);
                        
                        projectCompiler.CompileProject();
                    }
                },
                ProjectCompilerFactory: function (solutionData, projectData, projectFile) {
                    switch(projectData.ProjectType){
                        case JsBedRock.Compiler.ProjectTypes.Assets:
                            return new JsBedRock.Compiler.AssetProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.BrowserExecutable:
                            return new JsBedRock.Compiler.BrowserExecutableProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.ClassLibrary:
                            return new JsBedRock.Compiler.ClassLibraryProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.NodeExecutable:
                            return new JsBedRock.Compiler.NodeExecutableProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        case JsBedRock.Compiler.ProjectTypes.TestRunner:
                            return new JsBedRock.Compiler.TestRunnerProjectCompiler(solutionData, projectData, projectFile);
                            break;
                        default:
                            return new JsBedRock.Compiler.ProjectCompilerBase(solutionData, projectData, projectFile);
                            break;
                    };
                }
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