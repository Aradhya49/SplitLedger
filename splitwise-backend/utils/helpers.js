exports.splitAmount = (amount, peopleCount) => {
  return amount / peopleCount;
};

exports.calculateBalances = (expenses) => {
  const balances = {};

  expenses.forEach(exp => {
    const split = exp.amount / exp.people.length;

    exp.people.forEach(person => {
      if (!balances[person]) balances[person] = 0;
      balances[person] -= split;
    });

    if (!balances[exp.paidBy]) balances[exp.paidBy] = 0;
    balances[exp.paidBy] += exp.amount;
  });

  return balances;
};