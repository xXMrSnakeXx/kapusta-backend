// const { createError } = require("../../helpers");
// const { Transaction } = require("../../models/transactions");

const getTransactionsByType = async (req, res) => {
//   const { _id: owner } = req.user;

//   const { month, year } = req.query;
//   console.log(year);
//   const transactionsByType = await Transaction.aggregate([
//     {
//       $match: {
//         owner: owner,
//         "date.month": month,
//         "date.year": year,
//       },
//     },
//     {
//       $group: {
//         _id: "$income",
//         categories: { $addToSet: "$categories" },
//       },
//       totalSum: { $sum: "$value" },
//     },
//     {
//       $project: {
//         _id: 1,
//         totalSum: 1,
//         categories:1
//       },
//     },
//   ]);

//   console.log(transactionsByType);

//   if (!transactionsByType) {
//     throw createError(404);
//   }

//   res.json({
//     status: "success",
//     code: 200,
//     transactionsByType,
//   });
};
module.exports = getTransactionsByType;
