const { all, create } = require("mathjs");

const math = create(all);

const replacements = {};

// our extended configuration options
const config = {
  angles: "deg", // 'rad', 'deg', 'grad'
};

// create trigonometric functions replacing the input depending on angle config
const fns1 = ["sin", "cos", "tan", "sec", "cot", "csc"];
fns1.forEach(function (name) {
  const fn = math[name]; // the original function

  const fnNumber = function (x) {
    // convert from configured type of angles to radians
    switch (config.angles) {
      case "deg":
        return fn((x / 360) * 2 * Math.PI);
      case "grad":
        return fn((x / 400) * 2 * Math.PI);
      default:
        return fn(x);
    }
  };

  // create a typed-function which check the input types
  replacements[name] = math.typed(name, {
    number: fnNumber,
    "Array | Matrix": function (x) {
      return math.map(x, fnNumber);
    },
  });
});

// create trigonometric functions replacing the output depending on angle config
const fns2 = ["asin", "acos", "atan", "atan2", "acot", "acsc", "asec"];
fns2.forEach(function (name) {
  const fn = math[name]; // the original function

  const fnNumber = function (x) {
    const result = fn(x);

    if (typeof result === "number") {
      // convert to radians to configured type of angles
      switch (config.angles) {
        case "deg":
          return (result / 2 / Math.PI) * 360;
        case "grad":
          return (result / 2 / Math.PI) * 400;
        default:
          return result;
      }
    }

    return result;
  };

  // create a typed-function which check the input types
  replacements[name] = math.typed(name, {
    number: fnNumber,
    "Array | Matrix": function (x) {
      return math.map(x, fnNumber);
    },
  });
});

// import all replacements into math.js, override existing trigonometric functions
math.import(replacements, { override: true });

module.exports = {
  math,
};
