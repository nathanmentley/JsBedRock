//JsBedRock.Console
(function (asm) {
    asm.OnLoad(function () {
        var PrivateMembers = {
            Initialized: false,
            EnableConsole: true,
            Reporter: null
        };
        
        PrivateMembers.Reporter = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
                if (PrivateMembers.Initialized)
                    JsBedRock.Console.Error("JsBedRock.Console is a singleton. You cannot create a second instance.");
                PrivateMembers.Initialized = true;
    
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
                Init: function () {
                    PrivateMembers.EnableConsole = false;
                    this.Base();
                },
                Error: function (_message) {
                    if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message)) {
                        throw new Error(_message);
                    }
                },
                Info: function (_message) {
                    if (typeof console != "undefined")
                        if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message) && PrivateMembers.EnableConsole)
                            console.info(_message);
                },
                Log: function (_message) {
                    if (typeof console != "undefined")
                        if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message) && PrivateMembers.EnableConsole)
                            console.log(message);
                },
                EnableDebugging: function () {
                    PrivateMembers.EnableConsole = true;
                },
                DisableDebugging: function () {
                    PrivateMembers.EnableConsole = false;
                },
                IsDebuggingOn: function () {
                    return PrivateMembers.EnableConsole;
                }
            }
        });
        
        JsBedRock.Console = new PrivateMembers.Reporter();
    });
})(JsBedRock.CurrentAssembly);