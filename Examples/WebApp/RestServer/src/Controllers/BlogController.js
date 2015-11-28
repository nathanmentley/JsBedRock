JsBedRock.Controllers = JsBedRock.Controllers || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Controllers.BlogController = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Controllers.BaseController,
            Constructor: function (request, response) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Controllers.BaseController, request, response);
            },
            Members: {
                Name: {
                    Def: 'Blog'
                },
                Data: {
                    Attributes: [
                        new JsBedRock.Node.Web.Rest.ResponseTypeAttribute(JsBedRock.Models.GetPostDataRequest)
                    ],
                    Def: function (request) {
                        return new JsBedRock.Models.GetPostDataResult("Data From Rest Server - " + request.PostID);
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);