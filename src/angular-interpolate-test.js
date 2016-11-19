"use strict";

describe("angular-interpolate", function () {

  beforeEach(module("angular-interpolate"));

  var properties = {
    prop1: "prop1",
    prop2: "prop2",
    prop3: "prop3",
    prop4: "{{prop2}}",
    prop5: "{{prop4}} plus {{prop3}}",
    prop6: "{{prop5}} plus {{prop6}}"
  }

  var tests = {
    "Bla bla {{prop1}} with {{prop2}} and {{prop3}}": "Bla bla prop1 with prop2 and prop3",
    "Bla bla {{prop2}} with {{prop3}} and {{prop4}}": "Bla bla prop2 with prop3 and prop2",
    "Bla bla {{prop3}} with {{prop4}} and {{prop5}}": "Bla bla prop3 with prop2 and prop2 plus prop3"
  }

  it("Direct interpolation", inject(function () {
    inject(function (Interpolate) {
      for (var key in tests)
        expect(Interpolate(key)(properties)).toBe(tests[key]);
    });
  }));

  it("Loop detection for direct interpolation", inject(function () {
    inject(function (Interpolate) {
      try {
        Interpolate("Bla bla {{prop4}} with {{prop5}} and {{prop6}}")(properties);
        fail("Expected \"Loop detected\"");
      } catch (error) {
        expect(error).toBe("Loop detected");
      }
    });
  }));

  it("Loop detection for object interpolation", inject(function () {
    inject(function (Interpolate) {
      try {
        Interpolate(properties)();
        fail("Expected \"Loop detected\"");
      } catch (error) {
        expect(error).toBe("Loop detected");
      }
    });
  }));

  it("Object interpolation", inject(function () {
    inject(function (Interpolate) {
      delete properties["prop6"];
      Interpolate(properties)();
      expect("prop2 plus prop3").toBe(properties["prop5"]);
    });
  }));
});