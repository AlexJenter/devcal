const {
  pipeParsers,
  mapTo,
  sepBy1,
  sequenceOf,
  char,
  optionalWhitespace,
} = require("arcsecond");

const namedProp = (name, parserFn) =>
  pipeParsers([
    parserFn,
    mapTo((x) => ({
      [name]: x,
    })),
  ]);

const mergeProps = (arr) => arr.reduce((acc, x) => ({ ...acc, ...x }), {});
const optionalMergeProps = (arr) =>
  arr.reduce((acc, x) => (x ? { ...acc, ...x } : acc), {});

const commaSeparated = sepBy1(sequenceOf([char(","), optionalWhitespace]));

module.exports = {
  namedProp,
  mergeProps,
  commaSeparated,
  optionalMergeProps,
};
