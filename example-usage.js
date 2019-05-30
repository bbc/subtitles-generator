const fs = require('fs');
const subtitlesComposer = require('./src/index.js');
// const getTextFromWordsList = require('./src/index.js').getTextFromWordsList;
const sampleWords = require('./sample/words-list.sample.json').words;

function getTextFromWordsList(words) {
  return words.map((word) => {return word.text;}).join(' ');
}

const plainText = getTextFromWordsList(sampleWords);

const subtitlesJson = subtitlesComposer({ words: sampleWords, type: 'json' });
const ttmlPremiere = subtitlesComposer({ words: sampleWords, type: 'premiere' });
const ittData = subtitlesComposer({ words: sampleWords, type: 'itt' });
const ttmlData = subtitlesComposer({ words: sampleWords, type: 'ttml' });
const srtData = subtitlesComposer({ words: sampleWords, type: 'srt', numberOfCharPerLine: 45 });
const vttData = subtitlesComposer({ words: sampleWords, type: 'vtt' });
const csvData = subtitlesComposer({ words: sampleWords, type: 'csv' });
const preSegmentTextData = subtitlesComposer({ words: sampleWords, type: 'pre-segment-txt' });
const testTet = subtitlesComposer({ words: plainText, type: 'txt' });

fs.writeFileSync('./example-output/test.json', JSON.stringify(subtitlesJson, null, 2));
fs.writeFileSync('./example-output/test-premiere.xml', ttmlPremiere);
fs.writeFileSync('./example-output/test.itt', ittData);
fs.writeFileSync('./example-output/test.ttml', ttmlData);
fs.writeFileSync('./example-output/test.srt', srtData);
fs.writeFileSync('./example-output/test.vtt', vttData);
fs.writeFileSync('./example-output/test.csv', csvData);
fs.writeFileSync('./example-output/test-presegment.txt', preSegmentTextData);
fs.writeFileSync('./example-output/test.txt', testTet);