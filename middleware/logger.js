const { exception } = require("console");
/// @desc logs requeest to console
const logger = (req, res, next) => {
    req.hello = 'world'
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`)
    next();
}
module.exports = logger;