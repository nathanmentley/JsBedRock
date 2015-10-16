JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.GlobalAssemblyCache
(function () {
    JsBedRock.Assemblies.GlobalAssemblyCache = JsBedRock.Assemblies.GlobalAssemblyCache || {};
	var PrivateMembers = {
		_GAC: {},
        LoadScript: function(u, c) {
            JsBedRock.Assemblies.LoaderLogic(u, c);
        },
        DoesAssemblyExist: function (asmKey) {
		  return asmKey in PrivateMembers._GAC;
        },
        LoadAssembly: function (asmDep, callback) {
            PrivateMembers.LoadScript('../../bin/' + PrivateMembers.GetAssemblyKey(asmDep) + '.min.js', callback);
            
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
        }
	};
    
    JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly = function (asmDef) {
        //Load Dependancies
        for(var i = 0; i < asmDef.Dependencies.length; i++){
            if(!PrivateMembers.DoesAssemblyExist(PrivateMembers.GetAssemblyKey(asmDef.Dependencies[i]))){
                PrivateMembers.LoadAssembly(asmDef.Dependencies[i], function () {
                    JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asmDef);
                });
                return;
            }
        }
        
        PrivateMembers.LoadAssemblyClasses(asmDef);
    };
})();