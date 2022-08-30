const { User } = require('../../models/user');

const setBalance = async (req, res) => {
    const { balance: commonBalance } = req.body;
    const { id, email } = req.user;

    const { balance } = await User.findById(id);

    if (balance !== null) {
        res.status(406).json({
            status: 'Not Acceptable',
            code: 406,
            data: {
                user: {
                    email,
                    balance,
                },
            },
        });

        return;
    }

    const { balance: updBalance } = await User.findByIdAndUpdate(id, { balance: commonBalance }, { new: true });

    res.status(201).json({
        status: 'balance update successful',
        code: 201,
        data: {
            user: {
                email,
                balance: updBalance,
            },
        },
    });
};

module.exports = setBalance;
