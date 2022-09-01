const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = new Schema(
  {
    date: {
      day: String,
      month: String,
      year: String,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    income: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addTransactionSchema = Joi.object({
  date: Joi.object({
    day: Joi.string(),
    month: Joi.string(),
    year: Joi.string(),
  }),
  description: Joi.string().required(),
  categories: Joi.string().required(),
  value: Joi.number().required(),
});


const schemas = {
  add: addTransactionSchema,
};

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  schemas,
};
