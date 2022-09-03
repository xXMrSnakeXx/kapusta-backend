const { Transaction } = require("../../models/transactions");
const { createError } = require('../../helpers');

const getTransactionListByType = async (req, res) => {
  const { id: owner } = req.user;
  const { month, year } = req.query;
  const {type }= req.params;

  if(!month&&!year){
    throw createError(400);
  }
   
  let income;

  if (type === "income") {
    income = true;
  } else if (type === "expense") {
    income = false;
  }

  if(income===undefined){
    throw createError(400);
  }
  const result = await Transaction.find({ owner,  income, month, year }, "-createdAt -updatedAt");

  if(result.length===0){
    throw createError(404, "Нет транзакций за такой период");
  }

  if(!result){
    throw createError(404);
  }

  res.json(result);

};
module.exports = getTransactionListByType;

// const getTransaction = async (req, res) => {
//   const { id: owner } = req.user;
//   const { page = 1, limit = 20 } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Transaction.find({ owner }, "", {
//     skip,
//     limit: Number(limit),
//   }).populate("owner", "email ");
//   res.json(result);
// };