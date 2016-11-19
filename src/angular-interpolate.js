"use strict";

angular.module("angular-interpolate", [
]).provider("Interpolate", function () {
  function interpolateRecurse(line, properties, index, open, close) {
    var start = line.indexOf(open, index);
    if (start < 0)
      return line;

    var end = line.indexOf(close, start + open.length);
    if (end < 0)
      throw "ParseException: {\nline: \"" + line + "\",\nstart: " + start + open.length + ",\nproperties: " + JSON.stringify(properties) + "\n}";

    var key = line.substring(start + open.length, end);
    var value = properties[key];
    var interpolated = interpolateRecurse(line, properties, end + close.length, open, close);
    return !value ? interpolated : interpolated.substring(0, start) + value + interpolated.substring(end + close.length);
  }

  function interpolateLine(line, properties, open, close) {
    if (!open)
      open = "{{";

    if (!close)
      close = "}}";
    
    var max = Object.keys(properties).length;
    max = max * max;
    var i = 0;
    while (true) {
      var interpolated = interpolateRecurse(line, properties, 0, open, close);
      if (line === interpolated)
        return line;

      if (++i == max) {
        if (line !== interpolated)
          throw "Loop detected";

        return interpolated;
      }

      line = interpolated;
    }
  }

  function interpolateString(string) {
    return function (properties, open, close) {
      if (!properties || Object.keys(properties).length === 0)
        return string;

      var lines = string.split(/(\r\n)|(\n)|(\r)/);
      var interpolated = "";
      for (var i = 0; i < lines.length; i++)
        interpolated += "\n" + interpolateLine(lines[i], properties, open, close);

      return interpolated.length == 0 ? "" : interpolated.substring(1);
    };
  };

  function interpolateObject(object) {
    return function (open, close) {
      for (var property in object)
        if (object.hasOwnProperty(property))
          object[property] = interpolateString(object[property])(object, open, close);

      return object;
    };
  };

  this.$get = function () {
    return function (stringOrObject) {
      return typeof (stringOrObject) !== "object" ? interpolateString(stringOrObject) : interpolateObject(stringOrObject);
    };
  }
});