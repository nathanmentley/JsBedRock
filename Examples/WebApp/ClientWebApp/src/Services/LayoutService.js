JsBedRock.Services = JsBedRock.Services || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Services.LayoutService = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Service,
            Constructor: function (context) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Service, context);
            },
            Members: {
                Name: "LayoutService",
                GetNavData: function (callback) {
                    callback(new JsBedRock.Models.TestResult("value one Layhout", "value too Layhout"));
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);