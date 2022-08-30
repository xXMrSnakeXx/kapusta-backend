const { User } = require('../../models/user');

const getBalance = async (req, res) => {
    const { _id } = req.user;

    const {balance} = await User.findById(_id);

    res.json({
        status: 'Ok',
        code: 200,
        data: { balance },
    });
};

module.exports = getBalance;