(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Main = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.WebAppStart,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.WebAppStart);
            },
            Members: {
                GetRoutes: {
                    Def: function () {
                        var ret = this.Base();
                        
                        ret.Add("Default", 
                            new JsBedRock.UI.Web.WebAppRouteDef(
                                JsBedRock.Components.HomePageComponent,
                                { 0: "TestValue1", 1: "TestValue2" }
                            )
                        );
                        ret.Add("Other",
                            new JsBedRock.UI.Web.WebAppRouteDef(
                                JsBedRock.Components.OtherPageComponent,
                                { 0: "BTestValue1", 1: "BTestValue2" }
                            )
                        );
                        
                        return ret;
                    },
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);