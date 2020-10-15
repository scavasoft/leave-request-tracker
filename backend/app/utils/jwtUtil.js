// const jwt = require('../');
// const lodash = require('lodash');
// const Config = require('../config/config')

const {} = require('../');








// class JwtUtil {
//     //default constructor
//     constructor() {
//     }
//
//     static verifyToken(req, res, next) {
//         //Get auth header value
//         const bearerHeader = req.headers['authorization'];
//         if (typeof bearerHeader === 'undefined') {
//             res.status(403).send({
//                 error: 'Forbidden'
//             });
//         } else {
//             const bearer = bearerHeader.split(' '); // Split by space
//             const token = bearer[1];
//             req.token = token;
//             jwt.verify(token, Config.SECRET_TOKEN, function (err, decoded) {
//                     if (err) {
//                         let err = new Error('Invalid request');
//                         err.status = 401;
//                         return next(err);
//                     } else {
//                         req.decoded = decoded;
//                         next();
//                     }
//                 }
//             );
//         }
//     }
//
//
//     static createJWToken(details) {
//         if (typeof details !== 'object') {
//             details = {}
//         }
//
//         if (!details.maxAge || typeof details.maxAge !== 'number') {
//             details.maxAge = 3600
//         }
//
//         details.sessionData = lodash.reduce(details.sessionData || {}, (memo, val, key) => {
//             if (typeof val !== "function" && key !== "password") {
//                 memo[key] = val
//             }
//             return memo
//         }, {})
//
//         let token = jwt.sign({
//                 data: details.sessionData
//             },
//             this.verifyToken(), {
//                 expiresIn: details.maxAge,
//                 algorithm: 'HS256'
//             })
//
//         return token;
//     }
//
//
// }
// export default JwtUtil;