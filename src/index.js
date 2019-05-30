const textSegmentation = require('./presegment-text/text-segmentation/index.js');
const addLineBreakBetweenSentences = require('./presegment-text/line-break-between-sentences/index.js');
const foldWords = require('./presegment-text/fold/index.js');
const divideIntoTwoLines = require('./presegment-text/divide-into-two-lines/index.js');
const preSegmentText = require('./presegment-text/index.js');
const getTextFromWordsList = require('./presegment-text/index.js')
  .getTextFromWordsList;

const ttmlGeneratorPremiere = require('./compose-subtitles/premiere.js');
const ittGenerator = require('./compose-subtitles/itt.js');
const ttmlGenerator = require('./compose-subtitles/ttml.js');
const srtGenerator = require('./compose-subtitles/srt.js');
const vttGenerator = require('./compose-subtitles/vtt.js');
const csvGenerator = require('./compose-subtitles/csv.js');

function segmentedTextToList(text) {
  let result = text.split('\n\n');
  result = result.map(line => {
    return line.trim();
  });

  return result;
}

function countWords(text) {
  return text
    .trim()
    .replace(/\n /g, '')
    .split(' ').length;
}

function countList(list) {
  return list.length - 1;
}

function addTimecodesToLines(wordsList, lines) {
  let wordCounter = 0;
  const linesCount = countList(lines);
  const results = lines.map((line, index) => {
    const jsonLine = { text: line.trim() };
    jsonLine.start = wordsList[wordCounter].start;
    // if not last line then increase counter for end word
    if (linesCount !== index) {
      wordCounter += countWords(line);
    }
    jsonLine.end = wordsList[wordCounter].end;

    return jsonLine;
  });

  return results;
}

function preSegmentTextJson(wordsList, numberOfCharPerLine) {
  const result = preSegmentText(wordsList, numberOfCharPerLine);
  const segmentedTextArray = segmentedTextToList(result);

  return addTimecodesToLines(wordsList, segmentedTextArray);
}

function subtitlesComposer({ words, type, numberOfCharPerLine }) {
  const subtitlesJson = preSegmentTextJson(words, numberOfCharPerLine);
  if (typeof words === 'string') {
    return preSegmentText(words, numberOfCharPerLine);
  }
  switch (type) {
  case 'premiere':
    return ttmlGeneratorPremiere(subtitlesJson);
  case 'ttml':
    return ttmlGenerator(subtitlesJson);
  case 'itt':
    return ittGenerator(subtitlesJson);
  case 'srt':
    return srtGenerator(subtitlesJson);
  case 'vtt':
    return vttGenerator(subtitlesJson);
  case 'json':
    return subtitlesJson;
  case 'csv':
    return csvGenerator(subtitlesJson);
  case 'pre-segment-txt':
    return preSegmentText(words, numberOfCharPerLine);
  case 'txt':
    return preSegmentText(words, numberOfCharPerLine);
  default:
    return {
      ttml: ttmlGenerator(subtitlesJson),
      premiere: ttmlGeneratorPremiere(subtitlesJson),
      itt: ittGenerator(subtitlesJson),
      srt: srtGenerator(subtitlesJson),
      vtt: vttGenerator(subtitlesJson),
      json: subtitlesJson
    };
  }
}

// module.exports.textSegmentation = textSegmentation;
// module.exports.addLineBreakBetweenSentences = addLineBreakBetweenSentences;
// module.exports.foldWords = foldWords;
// module.exports.divideIntoTwoLines = divideIntoTwoLines;
// module.exports.getTextFromWordsList = getTextFromWordsList;
// module.exports.preSegmentText = preSegmentText;
// module.exports.ttmlGeneratorPremiere = ttmlGeneratorPremiere;
// module.exports.ttmlGenerator = ttmlGenerator;
// module.exports.ittGenerator = ittGenerator;
// module.exports.srtGenerator = srtGenerator;
// module.exports.vttGenerator = vttGenerator;

export { textSegmentation, addLineBreakBetweenSentences, foldWords, divideIntoTwoLines, getTextFromWordsList, preSegmentText, ttmlGeneratorPremiere, ttmlGenerator, ittGenerator, srtGenerator, vttGenerator };

export default subtitlesComposer;
