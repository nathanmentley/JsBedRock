JsBedRock.Web = JsBedRock.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		//Private Static fs object.
		
        JsBedRock.Web.Dom = JsBedRock.Utils.ObjectOriented.CreateClass({
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