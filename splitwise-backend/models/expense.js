const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  people: {
    type: [String],
    required: true
  },

  paidBy: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "General"
  },

  /* =========================
     USER OWNER
  ========================= */

  userId: {

    type:
      mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true

  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model(
    "Expense",
    expenseSchema
  );