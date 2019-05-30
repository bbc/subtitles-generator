const fs = require('fs');
const preSegmentText = require('./index.js');
// requrie on js and json is relative to current file path
const sampleWords = require('../../sample/words-list.sample.json').words;
// fs is relative to where the node process start
const sampleSegmentedOutput = fs.readFileSync('./example-output/test-presegment.txt').toString();

const numberOfCharPerLine35 = 35;

test('presegment text ', () => {
  const result = preSegmentText(sampleWords);
  expect(result).toEqual(sampleSegmentedOutput);
});

test('presegment text - 35', () => {
  const result = preSegmentText(sampleWords, numberOfCharPerLine35);
  expect(result).toEqual(sampleSegmentedOutput);
});