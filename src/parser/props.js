const {
  pipeParsers,
  sepBy,
  char,
  mapTo,
  takeRight,
  sequenceOf,
  str,
  optionalWhitespace,
  many,
  choice,
  letter,
  letters,
  possibly,
  anyOfString,
} = require("arcsecond");

const words = pipeParsers([
  sepBy(char(" "))(letters),
  mapTo((x) => ({ words: x.join(" ") })),
]);

const notes = pipeParsers([
  takeRight(sequenceOf([str("notes:"), optionalWhitespace]))(
    many(choice([letter, anyOfString("' ")]))
  ),
  mapTo((x) => ({ notes: x.join("") })),
]);

const location = pipeParsers([
  takeRight(sequenceOf([str("location:"), optionalWhitespace]))(
    many(choice([letter, anyOfString("' ")]))
  ),
  mapTo((x) => ({ location: x.join("") })),
]);

const url = pipeParsers([
  sequenceOf([
    str("http"),
    possibly(char("s")),
    str("://"),
    pipeParsers([
      many(choice([letters, anyOfString(".")])),
      mapTo((x) => x.join("")),
    ]),
  ]),
  mapTo((x) => ({ url: x.join("") })),
]);

module.exports = {
  location,
  notes,
  words,
  url,
};
