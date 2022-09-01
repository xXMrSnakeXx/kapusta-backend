const { createError } = require("../../helpers");
const {Transaction} = require('../../models/transactions');

const getReportTrans = async (req, res) => {
  const { _id: owner } = req.user;
  const { month } = req.query;

  const transactions = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        'date.month': month,
        // "date.year": year,
      },
    },
    {
      $group: {
        _id: {
          income: "$income",
          categories: "$categories",
                   
        },
        total: { $sum: '$value'},
      },
    },
   
    {
      $project: {
        _id: 1,
        // income: 1,
        total: 1,
      },
    },
    {
        $sort: {
            "categories": 1
        }
    }
  ]);
  if (!transactions) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 200,
    transactions: transactions,
  });
};

module.exports = getReportTrans;
