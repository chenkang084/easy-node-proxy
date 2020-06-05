module.exports = (env) => {
  return (req, res, next) => {
    const backofficeUrl = ['stage', 'prod'].includes(env) ? 'https://auth.coupang.net' : 'https://auth.coupangdev.com';

    const cookies = req.cookies;
    let isSign = false;

    if (['stage', 'prod'].includes(env)) {
      isSign = !!cookies['pdt-boasd'];
    } else {
      isSign = !!cookies['dvp-boasd'];
    }

    if (!isSign) {
      const returnUrl = `${backofficeUrl}/login?returnUrl=${req.protocol}://${req.headers.host + req.originalUrl}`;
      console.info('user has not signed.', returnUrl);
      res.redirect(returnUrl);
    } else {
      next();
    }
  };
};
