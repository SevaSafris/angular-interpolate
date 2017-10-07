<img src="http://safris.org/logo.png" align="right">

## angular-interpolate
[![CohesionFirst](https://img.shields.io/badge/CohesionFirst%E2%84%A2--blue.svg)](https://cohesionfirst.com/) [![JavaCommons](https://img.shields.io/badge/angular-js-red.svg)](https://cohesionfirst.com/) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt) [![npm version](https://badge.fury.io/js/angular-interpolate.svg)](http://badge.fury.io/js/angular-interpolate)

This Angular module is a light-weight interpolator that replaces delimited keys in a string with values from a properties map. This module was created as a simple alternative for Angular's `$interpolate` provider. A common use of this tool is for a template interpolation use-case that does not require `$parse`, `$interpolate`, or `$compile`.

_[Comments and Issues](https://github.com/SevaSafris/angular-interpolate/issues)_

### Installation

##### NPM
```tcsh
npm install --save angular-interpolate
```

##### Bower
```tcsh
bower install --save angular-interpolate
```

##### Manual
```html
<script src="path/to/directory/angular-interpolate.js"></script>
```

### Dependencies

- Angular.js (~1.4.0)

#### Usage

This module uses the default `{{` and `}}` delimiters to distinguish interpolation keys, and these
delimiters are configurable. Keys are matched to values in a `properties` object.

Include `angular-interpolate` as a dependency in your project.

```javascript
angular.module("MyModule", ["angular-interpolate"]);
```

##### `Interpolate` with `string`

The `Interpolate` provider accepts a `string` argument, followed by a `properties` object with
key-value assignments for interpolation.

```javascript
var interpolated = Interpolate("I live with {{person1}} and {{person2}}.")({person1: "John", person2: "Jane"});
console.log(interpolated); // "I live with John and Jane."
```

##### `Interpolate` with `object`

The `Interpolate` provider accepts an `object` argument, which will effectively interpolate the values
for all keys in the object recursively, thus interpolating all cross-referenced keys in the object.
As one can easily make an object with a circular relationship, such as:

```javascript
{
  prop1: "{{prop2}}",
  prop2: "{{prop1}}"
}
```

The `Interpolate` function will detect the circular relationship and throwa "Loop detected" error.

```javascript
var interpolated = Interpolate({person1: "John", person2: "Jane", people: "{{person1}} and {{person2}}"});
console.log(interpolated); // {person1: "John", person2: "Jane", people: "John and Jane"
```

##### Configurable delimiters (`{{` and `}}`)

The `Interpolate` function accepts two additional parameters: `open` and `close`. By default, `open` = `{{`, and `close` = `}}`.

### Development

- `npm run build` - Build and minify
- `npm test` - Test

### License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details
