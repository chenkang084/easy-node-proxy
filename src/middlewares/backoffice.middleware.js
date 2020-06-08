const axios = require('axios');

module.exports = (env, whiteList) => {
  const backofficeUrl = ['stage', 'prod'].includes(env) ? 'https://auth.coupang.net' : 'https://auth.coupangdev.com';
  const backofficeApi = ['stage', 'prod'].includes(env)
    ? 'https://api-gateway.coupang.net/v2/providers/backoffice_auth/apis/api/v2/session/'
    : 'http://api-gateway.coupangdev.com/v2/providers/backoffice_auth/apis/api/v2/session/';

  return async (req, res, next) => {
    let boasd = undefined;
    const path = req.originalUrl || req.path;
    const returnUrl = `${backofficeUrl}/login?returnUrl=${req.protocol}://${req.headers.host + req.originalUrl}`;

    if (whiteList.includes(path)) {
      next();
    } else {
      const cookies = req.cookies;
      if (['stage', 'prod'].includes(env)) {
        boasd = cookies['pdt-boasd'];
      } else {
        boasd = cookies['dvp-boasd'];
      }

      // no backoffice cookie
      if (!boasd) {
        console.info('user has not signed.', returnUrl);
        res.redirect(returnUrl);
      } else {
        // has backoffice cookie ,validate cookie whether it is valid
        if (!req.session.loginId) {
          try {
            const { data } = await axios.default.post(
              `${backofficeApi + boasd}?serviceType=INTERNAL`,
              {},
              {
                headers: {
                  'Content-Type': 'application/json',
                  'X-CAG-Authorization': 'AG_CONSUMER_TOKEN access-key=099caae8-6460-47f6-a738-85294b22313c'
                }
              }
            );
            // save loginId to cookie as session expires policy
            req.session.loginId = data.loginId;
          } catch (error) {
            res.redirect(returnUrl);
          }
        }
        next();
      }
    }
  };
};
