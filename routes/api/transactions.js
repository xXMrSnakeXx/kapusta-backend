const express = require("express");

const ctrl = require(`../../controllers/transaction`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAllTransactions));

router.post("/:type", auth, ctrlWrapper(ctrl.addTransaction));

router.delete("/:transactionId", auth, ctrlWrapper(ctrl.deleteTransaction));

router.get("/report/:type", auth, ctrlWrapper(ctrl.getReportTransactions));

module.exports = router;
