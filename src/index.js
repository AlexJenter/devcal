const parser = require("./parser");

const input = ["23.02.2000 - 1.3.2026", "23.2. - 1.3.2026", "23. - 25.2.2026"];

const handleError = (error, parsingState) => {
  const e = new Error(error);
  e.parsingState = parsingState;
  throw e;
};

const handleSuccess = (result, parsingState) => {
  console.log(`Result: ${result}`);
  return result;
};

const parsingResult = input.map((test) =>
  parser.fork(test, handleError, handleSuccess)
);

console.log(parsingResult);
