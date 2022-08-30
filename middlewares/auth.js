const jwt = require('jsonwebtoken');
// const { basedir } = global;
const { User } = require(`../models/user`);
const { createError } = require(`../helpers`);
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers; 
    const [ bearer, token ] = authorization.split(' ');
    console.log(token)
    if (bearer !== 'Bearer') {
        console.log("ошибка заголовка")
        next(createError(401, "Not authorized"));
    }

    try {
        const { _id } = jwt.verify(token, SECRET_KEY);
        console.log(_id)
        const user = await User.findById(_id);
        console.log(user)

        if (!user || !user.token) {
            console.log("ошибка токена")
            next(createError(401, "Not authorized"));
            
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(" другая ошибка")
        next(createError(401, "Not authorized"));
        
    }
}

module.exports = auth;