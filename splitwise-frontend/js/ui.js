export function renderExpenses(expenses) {

  const list =
    document.getElementById("expenseList");

  list.innerHTML = "";

  expenses.forEach(exp => {

      const li =
        document.createElement("li");

      li.innerHTML = `
        <div class="expense-card">

          <div class="expense-info">

            <strong>${exp.title}</strong><br>

            <small class="expense-date">

  ${new Date(
    exp.timestamp
  ).toLocaleString()}

</small><br>

            ₹${exp.amount} 
            | Paid by ${exp.paidBy}<br>

            People:
            ${exp.people.join(", ")}<br>

            <span class="category-tag">
              ${exp.category || "General"}
            </span>

          </div>

          <div class="action-buttons">

            <button 
              class="edit-btn"
              data-id="${exp._id}"
            >
              Edit
            </button>

            <button 
              class="delete-btn"
              data-id="${exp._id}"
            >
              Delete
            </button>

          </div>

        </div>
      `;

      list.appendChild(li);

    });

}

/* =========================
   BALANCES
========================= */

export function renderBalances(expenses) {

  const balances = {};

  expenses.forEach(exp => {

    const split =
      exp.amount / exp.people.length;

    exp.people.forEach(person => {

      balances[person] =
        (balances[person] || 0)
        - split;

    });

    balances[exp.paidBy] =
      (balances[exp.paidBy] || 0)
      + exp.amount;

  });

  const list =
    document.getElementById(
      "balanceList"
    );

  list.innerHTML = "";

  for (let person in balances) {

    const li =
      document.createElement("li");

    const amount =
      Number(
        balances[person].toFixed(2)
      );

    if (amount > 0) {

      li.innerHTML = `
  <strong>${person}</strong>
  <span class="positive">
    should receive ₹${amount}
  </span>
`;

    }

    else {

      li.innerHTML = `
  <strong>${person}</strong>
  <span class="negative">
    should pay ₹${Math.abs(amount)}
  </span>
`;

    }

    list.appendChild(li);

  }

}

/* =========================
   FILTER DROPDOWN
========================= */

export function populateFilter(expenses) {

  const filter =
    document.getElementById("filter");

  const peopleSet =
    new Set();

  expenses.forEach(exp => {

    exp.people.forEach(person => {

      peopleSet.add(person);

    });

  });

  filter.innerHTML = `
    <option value="">All</option>
  `;

  peopleSet.forEach(person => {

    const option =
      document.createElement("option");

    option.value = person;

    option.textContent = person;

    filter.appendChild(option);

  });

}

/* =========================
   SETTLEMENTS
========================= */

export function renderSettlements(expenses) {

  const balances = {};

  expenses.forEach(exp => {

    const split =
      exp.amount / exp.people.length;

    exp.people.forEach(person => {

      balances[person] =
        (balances[person] || 0)
        - split;

    });

    balances[exp.paidBy] =
      (balances[exp.paidBy] || 0)
      + exp.amount;

  });

  const creditors = [];

  const debtors = [];

  for (let person in balances) {

    const amount =
      Number(
        balances[person].toFixed(2)
      );

    if (amount > 0) {

      creditors.push({
        person,
        amount
      });

    }

    else if (amount < 0) {

      debtors.push({
        person,
        amount: Math.abs(amount)
      });

    }

  }

  const settlements = [];

  let i = 0;

  let j = 0;

  while (
    i < debtors.length &&
    j < creditors.length
  ) {

    const debtor =
      debtors[i];

    const creditor =
      creditors[j];

    const settledAmount =
      Math.min(
        debtor.amount,
        creditor.amount
      );

    settlements.push(
      `${debtor.person} owes ${creditor.person} ₹${settledAmount.toFixed(2)}`
    );

    debtor.amount -= settledAmount;

    creditor.amount -= settledAmount;

    if (debtor.amount < 1) i++;

    if (creditor.amount < 1) j++;

  }

  const list =
    document.getElementById(
      "settlementList"
    );

  if (!list) return;

  list.innerHTML = "";

  if (settlements.length === 0) {

    const li =
      document.createElement("li");

    li.textContent =
      "No settlements pending.";

    list.appendChild(li);

    return;

  }

  settlements.forEach(text => {

    const li =
      document.createElement("li");

    li.textContent = text;

    list.appendChild(li);

  });

}

/* =========================
   ANALYTICS CARDS
========================= */

export function renderStats(
  expenses
) {

  /* TOTAL */

  const total =
    expenses.reduce(

      (sum, exp) =>
        sum + exp.amount,

      0

    );

  document.getElementById(
    "totalExpense"
  ).textContent =

    `₹${total}`;

  /* TRANSACTIONS */

  document.getElementById(
    "totalTransactions"
  ).textContent =

    expenses.length;

  /* TOP CATEGORY */

  const categories = {};

  expenses.forEach(exp => {

    categories[exp.category] =

      (categories[exp.category] || 0)

      + exp.amount;

  });

  let topCategory = "-";

  let max = 0;

  for (let category in categories) {

    if (
      categories[category] > max
    ) {

      max =
        categories[category];

      topCategory =
        category;

    }

  }

  document.getElementById(
    "topCategory"
  ).textContent =

    topCategory;

}