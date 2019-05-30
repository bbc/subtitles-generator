// for itt
const TC = require('smpte-timecode');

const tcFormat = (frames, FPS) => {
  const tc = TC(Math.round(frames), FPS, false);

  return tc.toString().replace(/^00/, '01'); // FIXME this breaks on videos longer than 1h!
};

module.exports = tcFormat;