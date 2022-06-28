const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.SECRET_TOKEN,
        { expiresIn: '1d'}
    );
};

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if ( authorization ) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify( token, process.env.SECRET_TOKEN, (error, decode) => {
            if(error) {
                res.status(400).json("invalid token");
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(400).json("no token");
    }
};

module.exports = { generateToken, isAuth };