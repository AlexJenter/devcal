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

const dateParser = choice([
  sepBy(char("."))(digits),
  sequenceOf([
    digits,
    takeRight(char("."))(monthNames),
    takeRight(char("."))(digits),
  ]),
]);

const parser = dateParser;

module.exports = parser;
