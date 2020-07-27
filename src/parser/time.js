const {
  char,
  choice,
  digits,
  sequenceOf,
  takeRight,
  possibly,
  str,
  optionalWhitespace,
  pipeParsers,
  mapTo,
} = require("arcsecond");

const { namedProp, mergeProps } = require("./util");

const hour = digits;
const minute = digits;
const time = sequenceOf([hour, possibly(takeRight(char(":"))(minute))]);

const timeDelimiters = sequenceOf([
  optionalWhitespace,
  choice([char("-"), char("—"), str("bis")]),
  optionalWhitespace,
]);

const timeRange = pipeParsers([
  sequenceOf([
    namedProp("from", time),
    namedProp("to", takeRight(timeDelimiters)(time)),
  ]),
  mapTo(mergeProps),
]);

module.exports = choice([
  namedProp("timeRange", timeRange),
  namedProp("time", time),
]);
