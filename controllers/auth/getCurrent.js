const getCurrent = async (req, res) => {
  const { email, balance, categories } = req.user;
  res.json({
    email,
    balance,
    categories,
  });
};

module.exports = getCurrent;
