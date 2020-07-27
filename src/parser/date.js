const {
  char,
  choice,
  digits,
  mapTo,
  optionalWhitespace,
  pipeParsers,
  possibly,
  sequenceOf,
  str,
  takeLeft,
  takeRight,
} = require("arcsecond");

const { namedProp, mergeProps } = require("./util");

const delimiter = sequenceOf([char("."), optionalWhitespace]);

const monthAliases = [
  "JAN January Januar",
  "FEB Feb February Februar",
  "MAR March März",
];

const monthNames = choice(
  monthAliases.map((mNames, mIndex) =>
    pipeParsers([choice(mNames.split(" ").map(str)), mapTo(() => mIndex + 1)])
  )
);

const dayOfMonth = takeLeft(digits)(delimiter);
const monthOfYear = takeLeft(choice([monthNames, digits]))(delimiter);
const year = digits;

const date = pipeParsers([
  sequenceOf([
    namedProp("day", dayOfMonth),
    namedProp("month", possibly(monthOfYear)),
    namedProp("year", possibly(year)),
  ]),
  mapTo(mergeProps),
]);

const rangeDelimiter = sequenceOf([
  optionalWhitespace,
  choice([char("-"), char("—"), str("bis")]),
  optionalWhitespace,
]);

const dateRange = pipeParsers([
  sequenceOf([
    namedProp("from", date),
    namedProp("to", takeRight(rangeDelimiter)(date)),
  ]),
  mapTo(mergeProps),
]);

module.exports = choice([
  namedProp("dateRange", dateRange),
  namedProp("date", date),
]);
