const path = require('path');

module.exports = function(req, res, next) {
  if (req.method === 'GET' && req.url.includes('sw.js')) {
    res.sendFile(path.resolve(__dirname, '../public/sw.js'));
  } else {
    next();
  }
};
