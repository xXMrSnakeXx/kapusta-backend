const { createError } = require("../../helpers");
const { Transaction } = require("../../models/transactions");

const getAllTransactions = async (req, res) => {
  const { _id: owner } = req.user;
  const { day, month, year } = req.query;

  if (day?.length !== 2 || month?.length !== 2 || year?.length !== 4) {
    throw createError(400, "Format must be: `day=02&month=02&year=2022`");
  }

  const allTransactions = await Transaction.find(
    { owner, day, month, year },
    "-createdAt -updatedAt"
  );

  res.json({
    allTransactions,
  });
};

module.exports = getAllTransactions;
