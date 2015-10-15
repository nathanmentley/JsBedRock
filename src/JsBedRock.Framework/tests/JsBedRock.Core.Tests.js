if (typeof JsBedRock == "undefined") JsBedRock.Console.Error("JsBedRock required");
if (typeof JsBedRock.Utils == "undefined") JsBedRock.Console.Error("JsBedRock.Utils required");

QUnit.test("JsBedRock.Utils.String.IsEmptyOrSpaces tests", function (assert) {
    assert.ok(
        JsBedRock.Utils.String.IsEmptyOrSpaces("      "),
        "Whitespace returns true."
    );
    assert.ok(
        JsBedRock.Utils.String.IsEmptyOrSpaces(""),
        "Empty string returns true."
    );
    assert.ok(
        JsBedRock.Utils.String.IsEmptyOrSpaces(null),
        "null returns true."
    );
    assert.ok(
        !JsBedRock.Utils.String.IsEmptyOrSpaces("Westeros"),
        "characters returns false"
    );
    assert.ok(
        !JsBedRock.Utils.String.IsEmptyOrSpaces("  Essos  "),
        "characters wrapped in whitespace returns false"
    );
});