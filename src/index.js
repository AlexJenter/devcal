const parser = require("./parser/index");

const parsingResult = parser("22.2.2026, Simple Event");

console.log(JSON.stringify(parsingResult, null, 4));
