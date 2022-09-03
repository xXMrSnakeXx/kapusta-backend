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
    throw createError(404, "No transactions for this period");
  }

  if(!result){
    throw createError(404);
  }

  res.json(result);

};
module.exports = getTransactionListByType;

