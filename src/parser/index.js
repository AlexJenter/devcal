const {
  possibly,
  takeLeft,
  sepBy,
  char,
  pipeParsers,
  mapTo,
  choice,
  sequenceOf,
  optionalWhitespace,
} = require("arcsecond");

const { mergeProps, optionalMergeProps } = require("./util");
const time = require("./time");
const date = require("./date");
const { location, words, notes, url, propsParser } = require("./props");

const comma = char(",");
const eventDelim = sequenceOf([comma, optionalWhitespace]);

const parser2 = pipeParsers([
  sequenceOf([
    takeLeft(date)(eventDelim),
    possibly(takeLeft(time)(eventDelim)),
    propsParser,
  ]),
  mapTo(optionalMergeProps),
]);

module.exports = parser2;
