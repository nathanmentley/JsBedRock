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