const {
  char,
  choice,
  digits,
  mapTo,
  pipeParsers,
  sepBy,
  sequenceOf,
  str,
  takeRight,
  optionalWhitespace,
  many1,
  digit,
  takeLeft,
} = require("arcsecond");

const monthAliases = [
  "JAN January Januar",
  "FEB February Februar",
  "MAR March März",
];

const monthNames = choice(
  monthAliases.map((mNames, mIndex) =>
    pipeParsers([choice(mNames.split(" ").map(str)), mapTo(() => mIndex + 1)])
  )
);

const time = sequenceOf([digits, takeRight(char(":"))(digits)]);
const timeDelimiters = choice([char("-"), char("—"), char("–")]);
const timeRange = sequenceOf([time, takeRight(timeDelimiters)(time)]);

const period = char(".");
const afterPeriod = (parserFn) => takeRight(period)(parserFn);

const dayOfMonth = takeLeft(digits)(period);
const monthOfYear = takeLeft(digits)(period);
const year = digits;

const date = choice([
  sequenceOf([dayOfMonth, monthOfYear, year]),
  sequenceOf([dayOfMonth, monthOfYear]),
  dayOfMonth,
]);
const dateDelimiters = sequenceOf([
  optionalWhitespace,
  choice([char("-"), char("—"), str("bis")]),
  optionalWhitespace,
]);
const dateRange = sequenceOf([date, takeRight(dateDelimiters)(date)]);

const parser = dateRange;

module.exports = parser;
