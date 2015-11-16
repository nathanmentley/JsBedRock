JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.UI.Web.HtmlComponentRenderer = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Render: function (template, model, context) {
                    var compiledTemplate = Handlebars.compile(template);
                    $(context.TargetId).html(compiledTemplate(model));
                }
            },
            Implements: [ JsBedRock.UI.IComponentRenderer ]
        });
    });
})(JsBedRock.CurrentAssembly);