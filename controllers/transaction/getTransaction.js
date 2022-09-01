const { Transaction } = require("../../models/transactions");
// const { createError } = require('../../helpers');
const getTransaction = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Transaction.find({ owner }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email ");
  res.json(result);
};
module.exports = getTransaction;