const authMiddleware =
  require("../middleware/authMiddleware")
  
const express = require("express");

const router = express.Router();

const Expense =
  require("../models/Expense");

/* =========================
   GET ALL EXPENSES
========================= */

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

  try {

    const expenses =
  await Expense.find({

    userId: req.userId

  })
  .sort({ timestamp: -1 });

    res.json(expenses);

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

/* =========================
   ADD EXPENSE
========================= */

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

  try {

    const {
      title,
      amount,
      people,
      paidBy,
      category
    } = req.body;

    const newExpense =
      new Expense({

        title,

        amount,

        people,

        paidBy,

        category,

        userId: req.userId

      });

    const savedExpense =
      await newExpense.save();

    res.status(201).json(
      savedExpense
    );

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

/* =========================
   DELETE EXPENSE
========================= */

router.delete(
  "/",
  authMiddleware,
  async (req, res) => {
  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Expense deleted"
    });

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

/* =========================
   UPDATE EXPENSE
========================= */

router.put(
  "/",
  authMiddleware,
  async (req, res) => {

  try {

    const updatedExpense =
      await Expense.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.json(updatedExpense);

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;