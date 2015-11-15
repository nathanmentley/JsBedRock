JsBedRock.Services = JsBedRock.Services || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Services.BlogService = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Service,
            Constructor: function (context) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Service, context);
            },
            Members: {
                Name: "BlogService",
                GetPosts: function () {
                    return new JsBedRock.Models.TestResult("value one", "value too");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);