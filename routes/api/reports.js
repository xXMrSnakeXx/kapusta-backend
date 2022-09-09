const express = require("express");

const ctrl = require(`../../controllers/reports`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

router.get("/:type", auth, ctrlWrapper(ctrl.getAllReportsByType));

router.get("/", auth, ctrlWrapper(ctrl.getReportTotalSum));

router.get("/summary/:type", auth, ctrlWrapper(ctrl.getReportByMonth));

module.exports = router;
