JsBedRock.Models = JsBedRock.Models || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Models.GetPostDataRequest = JsBedRock.Utils.ObjectOriented.CreateClass({
            Attributes: [
                new JsBedRock.Web.Rest.RestRequestRouteAttribute("Blog/Data")
            ],
            Inherit: JsBedRock.Web.Rest.RestRequest,
            Constructor: function (postID) {
                this.PostID = postID;
                
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Web.Rest.RestRequest);
            },
            Members: {
                PostID: {
                    Def: null
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);