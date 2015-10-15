window.JsBedRock = window.JsBedRock || {};

//JsBedRock.Console
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Console = new ((function () {
            var PrivateMembers = {
                Initialized: false,
                EnableConsole: true
            };
    
            var classDef = JsBedRock.Utils.ObjectOriented.ObjectDefBuilder(function () {
                if (PrivateMembers.Initialized)
                    JsBedRock.Console.Error("JsBedRock.Console is a singleton. You cannot create a second instance.");
                PrivateMembers.Initialized = true;
    
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            });
            JsBedRock.Utils.ObjectOriented.Inherit(classDef, JsBedRock.Types.Object);
    
            classDef.prototype.Name = "Console";
            classDef.prototype.Init = function () {
                PrivateMembers.EnableConsole = false;
                this.Base();
            };
    
            classDef.prototype.Error = function (_message) {
                if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message)) {
                    throw new Error(_message);
                }
            };
    
            classDef.prototype.Info = function (_message) {
                if (typeof console != "undefined")
                    if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message) && PrivateMembers.EnableConsole)
                        console.info(_message);
            };
    
            classDef.prototype.Log = function (_message) {
                if (typeof console != "undefined")
                    if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message) && PrivateMembers.EnableConsole)
                        console.log(message);
            };
    
            classDef.prototype.EnableDebugging = function () {
                PrivateMembers.EnableConsole = true;
            };
    
            classDef.prototype.DisableDebugging = function () {
                PrivateMembers.EnableConsole = false;
            };
    
            classDef.prototype.IsDebuggingOn = function () {
                return PrivateMembers.EnableConsole;
            };
    
            return classDef;
        })())();
    });
})(JsBedRock.CurrentAssembly);