JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Utils = JsBedRock.UI.Utils || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Utils = {
            GetKeyFromServiceType: function (serviceType) {
                return serviceType;
            }
        };
    });
})(JsBedRock.CurrentAssembly);