const { config } = require('../config/index');

function cacheResponse(res, seconds) {
  let time = !config.dev ? seconds : 0;
  res.set('Cache-Control', `public, max-age=${time}`);
}

module.exports = cacheResponse;
