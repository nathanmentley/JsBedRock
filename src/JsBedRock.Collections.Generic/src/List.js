window.JsBedRock = window.JsBedRock || {};
JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Generic = JsBedRock.Collections.Generic || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Generic.List1 = (function () {
            var classDef = JsBedRock.Utils.ObjectOriented.ObjectDefBuilder(function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Collections.Hidden.List);
            });
            JsBedRock.Utils.ObjectOriented.Inherit(classDef, JsBedRock.Collections.Hidden.List);
    
            classDef.prototype.Name = "List1";
    
            return classDef;
        })();
    });
})(JsBedRock.CurrentAssembly);