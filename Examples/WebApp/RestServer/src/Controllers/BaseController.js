JsBedRock.WebAppExample = JsBedRock.WebAppExample || {};
JsBedRock.WebAppExample.Controllers = JsBedRock.WebAppExample.Controllers || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.WebAppExample.Controllers.BaseController = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.Rest.Controller,
            Constructor: function (request, response) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.Rest.Controller, request, response);
            },
            Members: {
                Name: {
                    Def: 'Base'
                },
                _WriteHeader: {
                    Def: function() {
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