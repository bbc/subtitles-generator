const formatSeconds = require('./util/format-seconds.js');

const vttGenerator = (vttJSON) => {
  let vttOut = 'WEBVTT\n\n';
  vttJSON.forEach((v, i) => {
    vttOut += `${ i + 1 }\n${ formatSeconds(parseFloat(v.start)) } --> ${ formatSeconds(parseFloat(v.end)) }\n${ v.text }\n\n`;
  });

  return vttOut;
};

module.exports = vttGenerator;