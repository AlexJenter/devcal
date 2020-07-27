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

const afterPeriod = (parserFn) => takeRight(char("."))(parserFn);

const date = choice([
  sepBy(char("."))(digits),
  sequenceOf([digits, afterPeriod(monthNames), afterPeriod(digits)]),
]);

const parser = timeRange;

module.exports = parser;
