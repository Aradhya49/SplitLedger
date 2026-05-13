const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/expenses.json");

const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

exports.addExpense = (req, res) => {
  const { title, amount, people, paidBy } = req.body;

  if (!title || !amount || !people || !paidBy) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const expenses = readData();

  const newExpense = {
    id: uuidv4(),
    title,
    amount,
    people,
    paidBy,
    timestamp: new Date()
  };

  expenses.push(newExpense);
  writeData(expenses);

  res.status(201).json(newExpense);
};

exports.getExpenses = (req, res) => {
  const expenses = readData();
  res.json(expenses);
};