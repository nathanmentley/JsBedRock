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
                    Def: function () {
                        var promise = new JsBedRock.Promise();
                        
                        promise.Resolve(new JsBedRock.Models.TestResult("idvalue", "value one Layhout", "value too Layhout"));
                        
                        return promise;
                    }
                },
                _RootUrl: { Def: "http://localhost:8080" }// JsBedRock.AppConfig.ClientWebApp.RestServerUrlRoot }
            }
        });
    });
})(JsBedRock.CurrentAssembly);