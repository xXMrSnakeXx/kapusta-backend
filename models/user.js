const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const userSchema = Schema({
    password: {
        type: String,
        minlength: 6,
        // required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    token: {
        type: String,
        default: null,
    },
    balance: {
        type: Number,
        default: null
    },
    // verify: {
    //     type: Boolean,
    //     default: false,
    // },
    // verificationToken: {
    //     type: String,
    //     required: [true, 'Verify token is required'],
    // },
}, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    token: Joi.string(),
    balance: Joi.number()
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updateBalanceSchema = Joi.object({
    balance: Joi.number().required()
});

const schemas = {
    register: registerSchema,
    login: loginSchema,
    updateBalanceSchema,
    // email: emailSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
};