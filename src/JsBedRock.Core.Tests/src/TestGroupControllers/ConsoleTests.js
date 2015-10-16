window.JsBedRock = window.JsBedRock || {};
JsBedRock.Core = JsBedRock.Core || {};
JsBedRock.Core.Tests = JsBedRock.Core.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Core.Tests.ConsoleTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'ConsoleTests',
				Test: function () {
                    JsBedRock.Console.DisableDebugging();
                    this.Assert(!JsBedRock.Console.IsDebuggingOn(), "Console Debugging Turns Off");
                
                    //assert.throws(function () { JsBedRock.Console.Error("Without Debugging"); }, Error, "Error throws exception with debugging turned off.");
                
                    JsBedRock.Console.EnableDebugging();
                    this.Assert(JsBedRock.Console.IsDebuggingOn(), "Console Debugging Turns On");
                
                    //assert.throws(function () { JsBedRock.Console.Error("With Debugging"); }, Error, "Error throws exception with debugging turned on.");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);