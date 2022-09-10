const { User } = require(`../models/user`);
const { Session } = require(`../models/session`);
const { createError } = require(`../helpers`);
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(createError(401, "Not authorized"));
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(payload._id);
    const session = await Session.findById(payload.sid);

    if (!user) {
      next(createError(401, "Invalid user"));
    }
    if (!session) {
      next(createError(401, "Invalid session"));
    }
    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    next(createError(401, "Not authorized"));
  }
};

module.exports = auth;
