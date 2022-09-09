const express = require("express");

const ctrl = require(`../../controllers/auth`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

router.get("/google", ctrlWrapper(ctrl.googleAuth));

router.get("/google-redirect", ctrlWrapper(ctrl.googleRedirect));

router.post("/register", ctrlWrapper(ctrl.register));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/balance", auth, ctrlWrapper(ctrl.updateBalance));

module.exports = router;
