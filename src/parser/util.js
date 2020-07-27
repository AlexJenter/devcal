const { pipeParsers, mapTo } = require("arcsecond");

const namedProp = (name, parserFn) =>
  pipeParsers([
    parserFn,
    mapTo((x) => ({
      [name]: x,
    })),
  ]);

const mergeProps = (prop) => prop.reduce((acc, x) => ({ ...acc, ...x }), {});

module.exports = {
  namedProp,
  mergeProps,
};
