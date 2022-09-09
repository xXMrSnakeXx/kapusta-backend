const getCurrent = async (req, res) => {
  const { email, token, balance, categories } = req.user;
  res.json({
    email,
    token,
    balance,
    categories,
  });
};

module.exports = getCurrent;
