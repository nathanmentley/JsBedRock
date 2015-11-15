JsBedRock.UI = JsBedRock.UI || {};
JsBedRock.UI.Web = JsBedRock.UI.Web || {};

(function (asm) {
    asm.OnLoad(function () {
		JsBedRock.UI.Web.HtmlComponentRenderer = JsBedRock.Utils.ObjectOriented.CreateClass({
			Inherit: JsBedRock.UI.ComponentRenderer,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.ComponentRenderer);
            },
            Members: {
                Render: function (template, model, context) {
                    var compiledTemplate = Handlebars.compile(template);
                    $(context.TargetId).html(compiledTemplate(model));
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);