window.JsBedRock = window.JsBedRock || {};
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.GlobalAssemblyCache
(function () {
    JsBedRock.Assemblies.GlobalAssemblyCache = JsBedRock.Assemblies.GlobalAssemblyCache || {};
	var PrivateMembers = {
		_GAC: {},
        LoadScript: function(u, c) {
            var d = document, t = 'script',
                o = d.createElement(t),
                s = d.getElementsByTagName(t)[0];
            o.src = u;
            if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
            s.parentNode.insertBefore(o, s);
        },
        DoesAssemblyExist: function (asmKey) {
		  return asmKey in PrivateMembers._GAC;
        },
        LoadAssembly: function (asmDep, callback) {
            PrivateMembers.LoadScript('../../../bin/' + PrivateMembers.GetAssemblyKey(asmDep) + '.min.js', callback);
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
                    PrivateMembers.AssembliesLoading--;
                    JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asmDef);
                });
                return;
            }
        }
        
        PrivateMembers.LoadAssemblyClasses(asmDef);
    };
})();