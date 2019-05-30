const formatSeconds = require('./util/format-seconds.js');
const srtGenerator = (vttJSON) => {
  let srtOut = '';
  vttJSON.forEach((v, i) => {
    srtOut += `${ i + 1 }\n${ formatSeconds(parseFloat(v.start)).replace('.', ',') } --> ${ formatSeconds(parseFloat(v.end)).replace('.', ',') }\n${ v.text.trim() }\n\n`;
  });

  return srtOut;
};

module.exports = srtGenerator;