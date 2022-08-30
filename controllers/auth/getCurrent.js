const { User } = require(`../../models/user`);
const getCurrent = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await User.findById(_id);
  res.status(200).json({
    email: currentUser.email,
    balance: currentUser.balance,
  });
};
module.exports = getCurrent;