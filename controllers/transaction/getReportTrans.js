const { createError } = require("../../helpers");
const { Transaction } = require("../../models/transactions");

const getReportTrans = async (req, res) => {
  const { _id: owner } = req.user;
  const { type } = req.params;
  const { month, year } = req.query;
  
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

  const transactions = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        month: month,
        year: year,
        income: income,
      },
    },

    {
      $group: {
        _id: {
          categories: "$categories",
          description:  "$description" ,
        },
        totalDescriptionSum: { $sum: "$value" },

      },
    },
    {
      $group: {
        _id: "$_id.categories",
        report: { $push: "$$ROOT" },
        totalCategoriesSum: {
          $sum: "$totalDescriptionSum",
        },
      },
    },

    {
      $project: {
        _id: 1,
        report: 1,
        total: 1,
        totalCategoriesSum:1,
      },
    },
  ]);

  if(transactions.length===0){
    throw createError(404, "Нет транзакций за такой период");
  }

  // const transactions = await Transaction.aggregate([
  //   {
  //     $match: {
  //       owner: owner,
  //       "date.month": month,
  //       // 'date.year': year
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: {
  //         income: "$income",
  //         categories: "$categories",
  //         description: "$description",
  //         value: "$value",
  //       },
  //     },
  //   },
    
  //   {
  //     $group: {
  //       _id: "$_id.categories",
  //       data: {
  //         $push: {
  //           type: "$_id.income",
  //           description: "$_id.description",
  //           value: "$_id.value",
  //         },
  //       },
  //       summary: { $sum: "$_id.value" },
  //     },
  //   },
    
  //   {
  //     $group: {
  //       _id: { $first: "$data.type" },
  //       reports: {
  //         $push: "$$ROOT",
  //       },
  //       total: { $sum: "$summary" },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: {
  //         income: "$_id",
  //       },
  //       reports: 1,
  //       total: 1,
  //     },
  //   },
  // ]);
  

  if (!transactions) {
    throw createError(404);
  }

  
  res.json({
    status: "success",
    code: 200,
    transactions,
  });
};

module.exports = getReportTrans;
