const {
  namedSequenceOf,
  possibly,
  takeLeft,
  str,
  sepBy,
  letters,
  char,
  pipeParsers,
  mapTo,
  choice,
  sequenceOf,
  optionalWhitespace,
  letter,
  many,
  takeRight,
  anyOfString,
} = require("arcsecond");

const time = require("./time");
const date = require("./date");
const { mergeProps } = require("./util");
const { location, words, notes, url } = require("./props");

const parser2 = pipeParsers([
  sepBy(sequenceOf([char(","), optionalWhitespace]))(
    choice([date, time, notes, location, url, words])
  ),
  mapTo(mergeProps),
]);

module.exports = parser2;
