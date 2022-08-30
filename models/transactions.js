const { Schema, model } = require("mongoose");
const Joi = require('joi');

const transactionSchema = new Schema(
    {
        date: {
            day: String,
            month: String,
            year: String
        },
        description: {
            type: String,
            required: true,
        },
        categories: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true,
        },
        income: {
            type: Boolean,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    { versionKey: false, timestamps: true }
);

const Transaction = model('transaction', transactionSchema);

const addTransactionSchema = Joi.object({
    data: Joi.object({
        date: Joi.string(),
        month: Joi.string(),
        year: Joi.string()
    }),
    description: Joi.string().required(),
    categories: Joi.string(),
    value: Joi.number().required(),
    income: Joi.boolean().required()
});

const schemas = {
    add: addTransactionSchema,
}

module.exports = {
    Transaction,
    schemas,
};
