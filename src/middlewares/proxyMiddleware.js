const chalk = require('chalk');

const targetProxy = process.env.targetProxy;
const port = process.env.port;
const host = process.env.host;
const axios = require('axios');

function createNoncestr(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let accessToken = '';
let workKey = '';
const server = 'https://wxzhsc.sasseur.com/api/v3';

module.exports = async (req, res, next) => {
  var url = req.url;
  const rnd = createNoncestr(9);
  const appKey = '1C1GNKFGQ';
  const deviceId = 'MAC';
  const method = req.method;

  if (method === 'POST' && url.indexOf('securities/devices/register') > -1) {
    try {
      const { data } = await axios.default.post(
        `${server}/securities/devices/register?rnd=${rnd}&appKey=${appKey}&deviceId=${deviceId}`
      );

      accessToken = data.body.accessToken;
      workKey = data.body.workKey;

      res.send(data);
    } catch (error) {
      res.status(error.response.status).send(error.message);
    }
  } else {
    try {
      const query = Object.keys(req.query).length;

      const api = `${server + url}${
        query > 0 ? '&' : '?'
      }accessToken=${accessToken}&rnd=${rnd}&appKey=${appKey}&timestamp=${new Date().getTime()}&sign=${'2E290E0116F83A805BA0DD950B770083'}&signType=md5`;

      const { data } = await axios.default[method.toLowerCase()](api);

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).send(error.message);
    }

    // console.log(chalk.green(`proxy http://${host + ':' + port + url} --> ${targetProxy + url}`));
    // next();
  }
};
