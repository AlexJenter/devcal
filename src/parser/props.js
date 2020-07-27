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

const { namedProp, mergeProps, commaSeparated } = require("./util");

const words = pipeParsers([
  sepBy(char(" "))(letters),
  mapTo((s) => s.join(" ")),
]);

const prop = (name) =>
  pipeParsers([
    takeRight(sequenceOf([str(name), optionalWhitespace]))(
      many(choice([letter, anyOfString("' ")]))
    ),
    mapTo((x) => x.join("")),
  ]);

const notes = prop("notes:");
const location = prop("location:");

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
  mapTo((x) => x.join("")),
]);

module.exports = pipeParsers([
  commaSeparated(
    choice([
      namedProp("notes", notes),
      namedProp("location", location),
      namedProp("url", url),
      namedProp("words", words),
    ])
  ),
  mapTo(mergeProps),
]);
