const { Schema, model } = require("mongoose");
const Joi = require("joi");
const categories = require("../db_categories/categories.json");

const emailRegexp = /^\w+([.-]?\w+)*([.-_]?\w{1,2})@\w+([.]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      minlength: 10,
      maxlength: 63,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    categories: {
      type: Array,
      default: categories,
    },
    balance: {
      type: Number,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  
});

const updateBalanceSchema = Joi.object({
  balance: Joi.number().required(),
});

const schemas = {
  register: registerSchema,
  updateBalanceSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
