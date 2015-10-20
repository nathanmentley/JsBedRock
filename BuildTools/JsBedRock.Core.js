(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Core',
		Dependencies: [  ]
	});
})();
;
JsBedRock.Types = JsBedRock.Types || {};

//JsBedRock.Types
(function (asm) {
	asm.OnLoad(function () {
		JsBedRock.Types.Interface = JsBedRock.Utils.ObjectOriented.CreateInterface({
			Name: "Interface",
			Members: {
				Init: function () { }
			}
		});
	});
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Types = JsBedRock.Types || {};

//JsBedRock.Types
(function (asm) {
	asm.OnLoad(function () {
        JsBedRock.Types.Object = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                /// <summary>Base Object Type. All JsBedRock Object Types must Inherit from this object.</summary>
                this.Init();
            },
            Implements: [
                JsBedRock.Types.Interface
            ],
            Members: {
                Base: function () {
                    /// <summary>Executes the inherited class def's implementation of the current method</summary>
                    /// <param name="param[]" type="any">Any parameters for the base method should be included as parameters on this method call.</param>
        
                    //Since we only have the method definition of the calling method... We'll have to cycle through the intstance to get the method name.
                    var methodName = JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(this, arguments.callee.caller);
        
                    //Create these hidden props if they don't exist.
                    this.__InheritanceMethodDepth = this.__InheritanceMethodDepth || {};
                    this.__InheritanceChain = this.__InheritanceChain || [];
                    this.__InheritanceMethodDepth[methodName] = this.__InheritanceMethodDepth[methodName] || this.__InheritanceChain.length;
                    var inheritanceChain = this.__InheritanceChain.reverse();
                    
                    //We're now looking for a method that's one more step down the inheritance chain.
                    this.__InheritanceMethodDepth[methodName]--;
        
                    //If we find the method, but it has the same def as the method we just executed... we don't want to re-execute.
                    // So we'll keep jumping down until we find the overriden method.
                    while (inheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName] === arguments.callee.caller || !inheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName])
                        this.__InheritanceMethodDepth[methodName]--;
        
                    //call the overriden method.
                    var ret = inheritanceChain[this.__InheritanceMethodDepth[methodName]].prototype[methodName].apply(this, arguments);
        
                    //Now that's it's been executed let's jump back up to the correct inheritance chain level.
                    this.__InheritanceMethodDepth[methodName]++;
        
                    //If the method has the same definition we'll need to keep jumping up.
                    while (this.__InheritanceMethodDepth[methodName] + 1 < this.__InheritanceDepth && inheritanceChain[this.__InheritanceMethodDepth[methodName] + 1].prototype[methodName] === arguments.callee.caller)
                        this.__InheritanceMethodDepth[methodName]++;
        
                    return ret;
                },
                Init: function () {
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
//JsBedRock.Console
(function (asm) {
    asm.OnLoad(function () {
        var PrivateMembers = {
            Initialized: false,
            EnableConsole: true,
            Reporter: null
        };
        
        PrivateMembers.Reporter = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                if (PrivateMembers.Initialized)
                    JsBedRock.Console.Error("JsBedRock.Console is a singleton. You cannot create a second instance.");
                PrivateMembers.Initialized = true;
    
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Init: function () {
                    PrivateMembers.EnableConsole = false;
                    this.Base();
                },
                Error: function (_message) {
                    if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message)) {
                        throw new Error(_message);
                    }
                },
                Info: function (_message) {
                    if (typeof console != "undefined")
                        if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message) && PrivateMembers.EnableConsole)
                            console.info(_message);
                },
                Log: function (_message) {
                    if (typeof console != "undefined")
                        if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message) && PrivateMembers.EnableConsole)
                            console.log(message);
                },
                Write: function (_message) {
                    if (typeof console != "undefined")
                        if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message))
                            console.info(_message);
                },
                EnableDebugging: function () {
                    PrivateMembers.EnableConsole = true;
                },
                DisableDebugging: function () {
                    PrivateMembers.EnableConsole = false;
                },
                IsDebuggingOn: function () {
                    return PrivateMembers.EnableConsole;
                }
            }
        });
        
        JsBedRock.Console = new PrivateMembers.Reporter();
    });
})(JsBedRock.CurrentAssembly);
;
(function(asm) {
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);