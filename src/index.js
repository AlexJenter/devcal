const parser = require("./parser/index");

const input = `
22.2.2026, Simple Event
23.2.2026, 16:00-17:00, Time Event
23. bis 24.Feb.2026, Event with notes, notes: it's nice
25.2.2026, Event with location, location: Zurich
26.2.2026, Event with link, http://test.ch
27.2.2026, Event with link, notes: still cool, location: here, http://test.ch
`
  .split("\n")
  .filter((s) => s);

const handleError = (error, parsingState) => {
  const e = new Error(error);
  e.parsingState = parsingState;
  throw e;
};

const handleSuccess = (result) => result;

const parsingResult = input.map((test) =>
  parser.fork(test, handleError, handleSuccess)
);

console.log(JSON.stringify(parsingResult, null, 4));
