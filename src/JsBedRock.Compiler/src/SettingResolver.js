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
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);