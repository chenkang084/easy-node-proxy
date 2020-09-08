const path = require('path');

module.exports = function(req, res, next) {
  console.log(req.url);
  if (req.method === 'GET' && req.url.includes('sw.js')) {
    res.sendFile(path.resolve(__dirname, '../public/sw.js'));
  } else {
    next();
  }
};
