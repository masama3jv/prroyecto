const crypto = require('crypto');
const requestId = (req, res, next) => {
  const incomingRequestId = req.headers['x-request-id'];
  req.requestId = incomingRequestId || crypto.randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
};
module.exports = requestId;
