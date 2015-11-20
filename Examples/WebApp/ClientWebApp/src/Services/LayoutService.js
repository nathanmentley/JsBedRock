JsBedRock.Services = JsBedRock.Services || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Services.LayoutService = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.RestClientService,
            Constructor: function (context) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.RestClientService, context);
            },
            Members: {
                Name: "Layout",
                GetNavData: function (callback) {
                    callback(new JsBedRock.Models.TestResult("idvalue", "value one Layhout", "value too Layhout"));
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);