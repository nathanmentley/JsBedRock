(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.MainLayoutComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.HtmlComponent,
            Constructor: function (context, renderer) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.HtmlComponent, context, renderer);
            },
            Members: {
                Init: function () {
                    this._Model = {
                        Title: "My New Post",
                        Body: "This is my first post!"
                    };
                    
                    this.Base();
                },
                _GetTemplate: function () {
                    return '\
                        <div class="entry">\
                            <h1 id="testTitleId">{{Title}}</h1>\
                            <div class="body">{{Body}}</div>\
                        </div>';
                },
                _InitListeners: function () {
                    var self = this;
                    
                    $("#testTitleId").click(function () {
                        self._Model.Title = self._Model.Title + "1";
                    });
                },
            }
        });
    });
})(JsBedRock.CurrentAssembly);