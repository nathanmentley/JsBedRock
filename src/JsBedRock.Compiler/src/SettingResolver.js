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
                            case 'NodeDependencies':
                                var deps = projectData[settingKey];
                                var ret = '';
                                
                                if(deps) {
                                    for(var i = 0; i < deps.length; i++) {
                                        ret += '"' + deps[i] + '",';
                                    }
                                }
                                
                                if(JsBedRock.Utils.String.IsEmptyOrSpaces(ret))
                                    return JsBedRock.Utils.String.Empty;
                                else
                                    return ret.substring(0, ret.length - 1);
                            case 'OutputFileName':
                                return require("path").basename(projectData.OutputFile);
                            default:
                                return projectData[settingKey];
                        }
                    });
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);