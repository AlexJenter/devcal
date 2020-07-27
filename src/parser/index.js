const {
  possibly,
  takeLeft,
  char,
  pipeParsers,
  mapTo,
  sequenceOf,
  optionalWhitespace,
} = require("arcsecond");

const { optionalMergeProps } = require("./util");
const time = require("./time");
const date = require("./date");
const propsParser = require("./props");

const comma = char(",");
const eventDelim = sequenceOf([comma, optionalWhitespace]);

const parser = pipeParsers([
  sequenceOf([
    takeLeft(date)(eventDelim),
    possibly(takeLeft(time)(eventDelim)),
    propsParser,
  ]),
  mapTo(optionalMergeProps),
]);

const handleError = (error, parsingState) => {
  const e = new Error(error);
  e.parsingState = parsingState;
  throw e;
};

const handleSuccess = (result) => result;

module.exports = (source) => parser.fork(source, handleError, handleSuccess);
