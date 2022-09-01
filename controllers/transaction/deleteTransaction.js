const { Transaction } = require("../../models/transactions");
const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndRemove(transactionId);
  console.log(result);
  const { income, value } = result;
  console.log(income);
  const { balance, _id } = req.user;

  let newBalance;

  if (income) {
    newBalance = balance - value;
    // if (newBalance < 0) {
    //     throw createError(400, "Недостаточно средств на балансе, что записать эту транзакцию");
    // }
  } else {
    newBalance = balance + value;
  }

  await User.findByIdAndUpdate(
    _id,
    { balance: newBalance },
    { new: true }
  );
//   console.log(user);
  if (!result) {
    throw createError(404);
  }

  res.json({
    balance: newBalance,
    message: "transaction deleted",
  });
};

module.exports = deleteTransaction;
