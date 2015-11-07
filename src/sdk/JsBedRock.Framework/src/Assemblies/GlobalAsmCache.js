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
    
    JsBedRock.Assemblies.GlobalAssemblyCache.GetLoadedAssemblies = function () {
        return PrivateMembers._GAC;
    };
})();