JsBedRock.Services = JsBedRock.Services || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Services.LayoutService = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.RestClientService,
            Constructor: function (context) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.RestClientService, context);
            },
            Members: {
                Name: { Def: "Layout" },
                GetNavData: {
                    Def: function (callback) {
                        callback(new JsBedRock.Models.TestResult("idvalue", "value one Layhout", "value too Layhout"));
                    }
                },
                _RootUrl: { Def: "http://localhost:8080" }// JsBedRock.AppConfig.ClientWebApp.RestServerUrlRoot }
            }
        });
    });
})(JsBedRock.CurrentAssembly);