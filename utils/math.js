import { math } from "../config/math.cjs";
import "../config/math.cjs";

// const evaluateInput = (value = "") => {
//     return `
//         const angleToRadian = (number) => number * Math.PI / 180;
//         const radianToAngle = (number) => number * 180 / Math.PI;
//         const [sin, cos, tan, csc, sec, cot] = [
//             (x) => Math.sin(angleToRadian(x)),
//             (x) => Math.cos(angleToRadian(x)),
//             (x) => Math.tan(angleToRadian(x)),
//             (x) => 1 / Math.sin(angleToRadian(x)),
//             (x) => 1 / Math.cos(angleToRadian(x)),
//             (x) => 1 / Math.tan(angleToRadian(x)),
//         ];
//         const [arcsin, arccos, arctan, arccsc, arcsec, arccot] = [
//             (x) => radianToAngle(Math.asin(x)),
//             (x) => radianToAngle(Math.acos(x)),
//             (x) => radianToAngle(Math.atan(x)),
//             (x) => radianToAngle(Math.asin(1 / x)),
//             (x) => radianToAngle(Math.acos(1 / x)),
//             (x) => radianToAngle(Math.atan(1 / x)),
//         ];
//         return ${value};
//     `;
// };

const filterInfinity = (value = "0") => {
  const number = parseFloat(value);
  const infiniteNumbers = [16331239353195370];
  const isInfinity = !isFinite(number) || infiniteNumbers.includes(number);
  const output = isInfinity ? "Not defined" : value;
  return output;
};

const decodeMathSymbol = (value = "") => {
  const symbolPairs = [
    ["×", "*"],
    ["÷", "/"],
    ["^", "**"],
    ["π", "pi"],
  ];
  const symbolKeys = [...symbolPairs.map((v) => v[0])];
  const decoded = value
    .split("")
    .map((v, i) => {
      const hasSymbol = symbolKeys.includes(v);
      const output = hasSymbol
        ? symbolPairs.find((pair) => pair[0] === v)[1]
        : v;
      return output;
    })
    .join("");
  return decoded;
};

export const solve = (value = "") => {
  try {
    const decodedValue = decodeMathSymbol(value);
    const evaluated = math.evaluate(decodedValue);
    if (typeof evaluated !== "number")
      throw new Error("Evaluated value is not number");
    const fixedEvaluated = Math.round(evaluated * 10e5) / 10e5;
    const output = filterInfinity(String(fixedEvaluated));
    return output;
  } catch (err) {
    const output = "Invalid math expressions.\nPlease see /help";
    return output;
  }
};

export default {
  solve,
};
