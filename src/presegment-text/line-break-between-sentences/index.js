'use strict';

function addLineBreakBetweenSentences(text) {
  return text.replace(/\n/g, '\n\n');
}

module.exports = addLineBreakBetweenSentences;