window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Hidden = JsBedRock.Collections.Hidden || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Hidden.List = (function () {
            var classDef = JsBedRock.Utils.ObjectOriented.ObjectDefBuilder(function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            });
            JsBedRock.Utils.ObjectOriented.Inherit(classDef, JsBedRock.Types.Object);
    
            classDef.prototype.Name = "List";
            classDef.prototype.Init = function () {
                this.Base();
            };
    
            classDef.prototype.IsDebuggingOn = function () {
                return this.Name;
            };
    
            return classDef;
        })();
    });
})(JsBedRock.CurrentAssembly);