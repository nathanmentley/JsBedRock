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
                Write: function (_message) {
                    if (typeof console != "undefined")
                        if (!JsBedRock.Utils.String.IsEmptyOrSpaces(_message))
                            console.info(_message);
                },
                EnableDebugging: function () {
                    PrivateMembers.EnableConsole = true;
                },
                DisableDebugging: function () {
                    PrivateMembers.EnableConsole = false;
                },
                IsDebuggingOn: function () {
                    return PrivateMembers.EnableConsole;
                },
                Dump: function (arr,level) {
                    var dumped_text = "";
                    if(!level) level = 0;
                    
                    //The padding given at the beginning of the line.
                    var level_padding = "";
                    for(var j=0;j<level+1;j++) level_padding += "    ";
                    
                    if(typeof(arr) == 'object') { //Array/Hashes/Objects 
                        for(var item in arr) {
                            var value = arr[item];
                            
                            if(typeof(value) == 'object') { //If it is an array,
                                dumped_text += level_padding + "'" + item + "' ...\n";
                                dumped_text += dump(value,level+1);
                            } else {
                                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                            }
                        }
                    } else { //Stings/Chars/Numbers etc.
                        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
                    }
                    return dumped_text;
                }
            }
        });
        
        JsBedRock.Console = new PrivateMembers.Reporter();
    });
})(JsBedRock.CurrentAssembly);