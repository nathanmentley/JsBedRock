window.JsBedRock = window.JsBedRock || {};
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDependency
(function () {
    JsBedRock.Assemblies.AssemblyDependency = function (overrides) { 
        var PrivateMembers = {
            Defaults: {
                Name: ''
            }
        };
        
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides);
        
        for(var prop in values)
            this[prop] = values[prop];
    };
})();