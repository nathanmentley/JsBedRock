JsBedRock.Controllers = JsBedRock.Controllers || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Controllers.BlogController = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.Rest.Controller,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.Rest.Controller);
            },
            Members: {
                Name: 'Blog',
                Data: [JsBedRock.Models.GetPostDataRequest, function (request) {
                    return new JsBedRock.Models.GetPostDataResult("Data From Rest Server - " + request.PostID);
                }]
            }
        });
    });
})(JsBedRock.CurrentAssembly);