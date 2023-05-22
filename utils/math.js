const evaluateInput = (value = "") => {
    return `
        const angleToRadian = (number) => number * Math.PI / 180;
        const radianToAngle = (number) => number * 180 / Math.PI;
        const [sin, cos, tan, csc, sec, cot] = [
            (x) => Math.sin(angleToRadian(x)),
            (x) => Math.cos(angleToRadian(x)),
            (x) => Math.tan(angleToRadian(x)),
            (x) => 1 / Math.sin(angleToRadian(x)),
            (x) => 1 / Math.cos(angleToRadian(x)),
            (x) => 1 / Math.tan(angleToRadian(x)),
        ];
        const [arcsin, arccos, arctan, arccsc, arcsec, arccot] = [
            (x) => radianToAngle(Math.asin(x)),
            (x) => radianToAngle(Math.acos(x)),
            (x) => radianToAngle(Math.atan(x)),
            (x) => radianToAngle(Math.asin(1 / x)),
            (x) => radianToAngle(Math.acos(1 / x)),
            (x) => radianToAngle(Math.atan(1 / x)),
        ];
        return ${value};
    `;
};

export const solve = (value = "") => {
    try {
        const evaluatorInput = evaluateInput(value);
        const evaluated = (Function(evaluatorInput))();
        const output = String(evaluated);
        return output;
    } catch (err) {
        const output = "Invalid math expressions.\nPlease see /help";
        return output;
    }
};

export default {
    solve,
};