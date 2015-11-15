JsBedRock.Controllers = JsBedRock.Controllers || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.Controllers.TestController = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.Node.Web.Rest.Controller,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Node.Web.Rest.Controller);
            },
            Members: {
                Name: 'Test',
                Index: function () {
                    return new JsBedRock.Models.TestResult("one", "two");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);