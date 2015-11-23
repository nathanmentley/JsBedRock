JsBedRock.Controllers = JsBedRock.Controllers || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Controllers.BlogController = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.Rest.Controller,
            Constructor: function (request, response) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.Rest.Controller, request, response);
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
                },
                _WriteHeader: {
                    Def: function() {
                        this.Base();
                        
                        if(this._Response) {
                            this._Response.writeHead(200, {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                'Access-Control-Allow-Headers': 'Content-Type'
                            });
                        }
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);