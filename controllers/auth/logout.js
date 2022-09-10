const { Session } = require(`../../models/session`);

const logout = async (req, res) => {
  const currentSession = req.session;

  await Session.findByIdAndRemove(currentSession._id);

  res.status(204).send();
};

module.exports = logout;
