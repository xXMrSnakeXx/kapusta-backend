const { Transaction } = require("../../models/transactions");
const { createError } = require("../../helpers");

const getTransactionListByType = async (req, res) => {
  const { id: owner } = req.user;
  const { day, month, year } = req.query;
  const { type } = req.params;

  // if (!day&&!month && !year) {
  //   throw createError(400);
  // }

  // if (day.length!==2||month.length !== 2 || year.length !== 4) {
  //   throw createError(400, "Format must be: `day=22&month=02&year=2022`");
  // }

  let income;

  if (type === "income") {
    income = true;
  } else if (type === "expense") {
    income = false;
  }

  if (income === undefined) {
    throw createError(400);
  }
  const result = await Transaction.find(
    { owner, income, day, month, year },
    "-createdAt -updatedAt"
  );

  if (result.length === 0) {
    throw createError(404, "No transactions for this period");
  }

  if (!result) {
    throw createError(404);
  }

  res.json(result);
};

module.exports = getTransactionListByType;
