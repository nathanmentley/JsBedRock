JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.UI.Web.HtmlHelper = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                CreateElement: function(elementType, attributes) {
                    var element = document.createElement(elementType);
                    
                    if(attributes){
                        for(var prop in attributes){
                            element.setAttribute(prop, attributes[prop]);
                        }
                    }
                    
                    return element;
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);