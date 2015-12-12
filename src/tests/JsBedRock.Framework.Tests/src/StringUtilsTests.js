JsBedRock.Framework = JsBedRock.Framework || {};
JsBedRock.Framework.Tests = JsBedRock.Framework.Tests || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Framework.Tests.StringUtilsTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: { Def: 'StringUtilsTests' },
                IsEmptyOrSpaces: {
                    Def: function () {
                        this.Assert(JsBedRock.Utils.String.IsEmptyOrSpaces("      "), "Whitespace returns true.");
                        this.Assert(JsBedRock.Utils.String.IsEmptyOrSpaces(""), "Empty string returns true.");
                        this.Assert(JsBedRock.Utils.String.IsEmptyOrSpaces(null), "null returns true.");
                        this.Assert(!JsBedRock.Utils.String.IsEmptyOrSpaces("Westeros"), "characters returns false");
                        this.Assert(!JsBedRock.Utils.String.IsEmptyOrSpaces("  Essos  "), "characters wrapped in whitespace returns false");
                    }
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);