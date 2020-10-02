const jwt = require('jsonwebtoken');

class JwtUtil {
    //default constructor
    constructor() {
    }

    static verifyToken(req, res, next) {
        //Get auth header value
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);

        if (typeof bearerHeader === 'undefined') {
            res.status(403).send({
                error: 'Forbidden'
            });
        } else {
            const bearer = bearerHeader.split(' '); // Split by space
            const token = bearer[1];

            jwt.verify(token, 'secretkey', function (err, decoded){
                console.log("22222");
                if (err){
                    console.log(err);
                    req.authenticated = false;
                    req.decoded = null;
                    next();
                } else {
                    console.log("33333");
                    req.decoded = decoded;
                    req.authenticated = true;
                    next();
                }
            });
            //TODO: create new column in user table jwt => 'done'
            //TODO: Check the sent token from front-end with this in Database => 'done'
            //TODO: Interceptor => ''
            //return next();
        }
    }
}

export default JwtUtil;