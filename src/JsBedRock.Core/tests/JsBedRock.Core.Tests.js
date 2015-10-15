if (typeof JsBedRock == "undefined") JsBedRock.Console.Error("JsBedRock required");
if (typeof JsBedRock.Utils == "undefined") JsBedRock.Console.Error("JsBedRock.Utils required");

//Setup test data / mocking objects
(function () {
    JsBedRock.Tests = JsBedRock.Tests || {};
    JsBedRock.Tests.Utils = JsBedRock.Tests.Utils || {};
    JsBedRock.Tests.Utils.ObjectOriented = JsBedRock.Tests.Utils.ObjectOriented || {};

    JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1 = JsBedRock.Utils.ObjectOriented.CreateInterface({
        Name: "ITestInterface1",
        Members: {
            TestMethod: function () { },
            TestMethod2: function () { },
            TestMethod3: function () { }
        }
    });

    JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1 = JsBedRock.Utils.ObjectOriented.CreateClass({
        Inherit: JsBedRock.Types.Object,
        Constructor: function () {
            JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
        },
        Members: {
            Name: "BaseTestObject1",
            TestMethod: function (var1) {
                return ++var1;
            }
        }
    });
    
    JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2 = JsBedRock.Utils.ObjectOriented.CreateClass({
        Inherit: JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1,
        Constructor: function () {
            JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1);
        },
        Members: {
            Name: "BaseTestObject2",
            TestMethod2: function (var1) { return var1 + 5; },
            TestMethod3: function () { return 'a'; }
        }
    });
    
    JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3 = JsBedRock.Utils.ObjectOriented.CreateClass({
        Inherit: JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2,
        Constructor: function () {
            JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2);
        },
        Implements: [
            JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1
        ],
        Members: {
            Name: "BaseTestObject3",
            TestMethod: function (var1) {
                var1 = this.Base(var1);
                return var1 + 10;
            },
            TestMethod3: function () { return 'b'; }
        }
    });
})();

QUnit.test("JsBedRock.Types.ObjectBuilder GetType tests", function (assert) {
    assert.equal(
        new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3().GetType(),
        JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3,
        "BaseTestObject3 -> GetType returned correct object def"
    );
    assert.equal(
        new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2().GetType(),
        JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2,
        "BaseTestObject2 -> GetType returned correct object def"
    );
    assert.equal(
        new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1().GetType(),
        JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1,
        "BaseTestObject1 -> GetType returned correct object def"
    );
    assert.equal(
        new JsBedRock.Types.Object().GetType(),
        JsBedRock.Types.Object,
        "Object -> GetType returned correct object def"
    );
});

QUnit.test("JsBedRock.Utils.ObjectOriented.Inherit tests", function (assert) {
    var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();

    //Test that we're inherited all three sub types.
    assert.equal(object3.__InheritanceChain.length, 3, "BaseTestObject3 correctly inherited three sub classes")

    assert.equal(object3.__InheritanceChain[0], JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2, "Inherited BaseTestObject2");
    assert.equal(object3.__InheritanceChain[1], JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1, "Inherited BaseTestObject1");
    assert.equal(object3.__InheritanceChain[2], JsBedRock.Types.Object, "Inherited Object");

    //Test that we're inheriting methods.
    assert.equal(object3.TestMethod2(2), 7, "Method Inherited Correctly.");

    //Test that we're overriding methods correctly.
    assert.equal(object3.TestMethod3(), 'b', "Method Overriden Correctly.");

    //Test overriden methods correctly handle this.Base(0);
    assert.equal(object3.TestMethod(3), 14, "this.Base() executed previously defined method the correct number of times.");
});

QUnit.test("JsBedRock.Utils.ObjectOriented.Implement tests", function (assert) {
    var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();

    //Test that we've implemented all the interfaces and that we're of the interface types.
    assert.equal(object3.__Implemented.length, 2, "Implemented both interfaces.");

    assert.equal(object3.__Implemented[0], JsBedRock.Types.Interface, "Implemented Interface");
    assert.equal(object3.__Implemented[1], JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1, "Implemented ITestInterface1");
});

QUnit.test("JsBedRock.Utils.ObjectOriented.IsOfType tests", function (assert) {
    var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();

    //Test that we're inherited all three sub types and that we're of the expected type.
    assert.ok(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3), "IsOfType BaseTestObject3");
    assert.ok(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2), "IsOfType BaseTestObject2");
    assert.ok(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject1), "IsOfType BaseTestObject1");
    assert.ok(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Tests.Utils.ObjectOriented.ITestInterface1), "IsOfType ITestInterface1");
    assert.ok(JsBedRock.Utils.ObjectOriented.IsOfType(object3, JsBedRock.Types.Object), "IsOfType Object");
});

QUnit.test("JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName tests", function (assert) {
    var object3 = new JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3();

    assert.equal(
        JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(
            object3,
            JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject3.prototype.TestMethod3
        ),
        "TestMethod3",
        "Reflected method name from method declared on the instance"
    );

    assert.equal(
        JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName(
            object3,
            JsBedRock.Tests.Utils.ObjectOriented.BaseTestObject2.prototype.TestMethod2
        ),
        "TestMethod2",
        "Reflected method name from method inherited onto the instance"
    );
});

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

QUnit.test("JsBedRock.Console tests", function (assert) {
    JsBedRock.Console.DisableDebugging();
    assert.notOk(JsBedRock.Console.IsDebuggingOn(), "Console Debugging Turns Off");

    assert.throws(function () { JsBedRock.Console.Error("Without Debugging"); }, Error, "Error throws exception with debugging turned off.");

    JsBedRock.Console.EnableDebugging();
    assert.ok(JsBedRock.Console.IsDebuggingOn(), "Console Debugging Turns On");

    assert.throws(function () { JsBedRock.Console.Error("With Debugging"); }, Error, "Error throws exception with debugging turned on.");
});