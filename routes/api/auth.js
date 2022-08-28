const express = require('express');

const ctrl = require(`../../controllers/auth`);

const { ctrlWrapper } = require(`../../helpers`);


// const { auth } = require(`../../middlewares`);

const router = express.Router();

// google authorization
router.get("/google", ctrlWrapper(ctrl.googleAuth));

router.get("/google-redirect", ctrlWrapper(ctrl.googleRedirect));

// sign up
router.post('/register', ctrlWrapper(ctrl.register));


// verification of email
// router.get('/verify/:verificationToken', auth, ctrlWrapper(ctrl.verifyEmail));

// resend verification of email
// router.post('/verify', auth, ctrlWrapper(ctrl.resendVerifyEmail));

// sign in
router.post('/login', ctrlWrapper(ctrl.login));

// current
// router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

// log out
// router.get('/logout', auth, ctrlWrapper(ctrl.logout));

// update subscription
// router.patch("/current", auth, ctrlWrapper(ctrl.updateUserSubscription));

module.exports = router;