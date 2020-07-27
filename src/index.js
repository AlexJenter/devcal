const parser = require("./parser");

const input = "16:00–17:00";

const handleError = (error, parsingState) => {
  const e = new Error(error);
  e.parsingState = parsingState;
  throw e;
};

const handleSuccess = (result, parsingState) => {
  console.log(`Result: ${result}`);
  return result;
};

const parsingResult = parser.fork(input, handleError, handleSuccess);

console.log(parsingResult);
