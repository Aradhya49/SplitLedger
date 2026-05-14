const mongoose =
  require("mongoose");

const expenseSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,
        required: true
      },

      amount: {
        type: Number,
        required: true
      },

      people: {
        type: Array,
        required: true
      },

      paidBy: {
        type: String,
        required: true
      },

      category: {
        type: String,
        required: true
      },

      userId: {
        type: String,
        required: true
      }

    },

    {
      timestamps: true
    }

);

module.exports =
  mongoose.model(
    "Expense",
    expenseSchema
  );