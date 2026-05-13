const token =
  localStorage.getItem("token");

if (!token) {

  window.location.href =
    "login.html";

}

import { renderChart } from "./chart.js";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense
} from "./store.js";

import {
  renderExpenses,
  renderBalances,
  populateFilter,
  renderSettlements,
  renderStats
} from "./ui.js";

let allExpenses = [];

let editMode = false;

let currentEditId = null;

/* =========================
   TOAST FUNCTION
========================= */

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  }, 2500);

}

/* =========================
   LOAD EXPENSES
========================= */

async function loadExpenses() {

  allExpenses = await getExpenses();

  renderExpenses(allExpenses);

  renderBalances(allExpenses);

  renderSettlements(allExpenses);

  renderChart(allExpenses);

  renderStats(allExpenses);

  populateFilter(allExpenses);

  addDeleteListeners();

  addEditListeners();

}

/* =========================
   ADD / UPDATE EXPENSE
========================= */

document
  .getElementById("addBtn")
  .addEventListener("click", async () => {

    const title =
      document.getElementById("title")
      .value
      .trim();

    const amount =
      parseFloat(
        document.getElementById("amount")
        .value
      );

      

    const peopleInput =
      document.getElementById("people")
      .value
      .trim();

    const paidBy =
      document.getElementById("paidBy")
      .value
      .trim();

    let category =
      document.getElementById("category")
      .value;

    const customCategory =
      document.getElementById("customCategory")
      .value
      .trim();

    const error =
      document.getElementById("error");

    /* =========================
       CUSTOM CATEGORY
    ========================= */

    if (
      category === "Other" &&
      customCategory
    ) {

      category = customCategory;

    }

    /* =========================
       VALIDATION
    ========================= */

    if (
      !title ||
      !amount ||
      !peopleInput ||
      !paidBy ||
      !category
    ) {

      error.textContent =
        "All fields are required!";

      return;

    }

    /* =========================
       PEOPLE ARRAY
    ========================= */

    const people =
      peopleInput
        .split(",")
        .map(p => p.trim());

    if (!people.includes(paidBy)) {

      error.textContent =
        "Paid By must match one of the people.";

      return;

    }

    error.textContent = "";

    /* =========================
       EXPENSE OBJECT
    ========================= */

    const expense = {

      title,

      amount,

      people,

      paidBy,

      category

    };

    /* =========================
       UPDATE
    ========================= */

    if (editMode) {

      await updateExpense(
        currentEditId,
        expense
      );

      document
  .getElementById("error")
  .textContent = "";

      showToast(
      "Expense updated ✏️"
      );

      editMode = false;

      currentEditId = null;

      document.getElementById(
        "addBtn"
      ).textContent =
        "Add Expense";

    }

    /* =========================
       ADD
    ========================= */

    else {

      await addExpense(expense);

      document
  .getElementById("error")
  .textContent = "";

      showToast(
  "Expense added successfully ✅"
);

    }

    clearInputs();

    loadExpenses();

});

/* =========================
   FILTER
========================= */

document
  .getElementById("filter")
  .addEventListener("change", (e) => {

    const value = e.target.value;

    if (!value) {

      renderExpenses(allExpenses);

    }

    else {

      const filtered =
        allExpenses.filter(exp =>
          exp.people.includes(value)
        );

      renderExpenses(filtered);

    }

    addDeleteListeners();

    addEditListeners();

});

/* =========================
   CATEGORY TOGGLE
========================= */

document
  .getElementById("category")
  .addEventListener("change", (e) => {

    const customInput =
      document.getElementById(
        "customCategory"
      );

    if (e.target.value === "Other") {

      customInput.style.display =
        "block";

    }

    else {

      customInput.style.display =
        "none";

      customInput.value = "";

    }

});

/* =========================
   DELETE
========================= */

function addDeleteListeners() {

  const modal =
    document.getElementById(
      "deleteModal"
    );

  const confirmBtn =
    document.getElementById(
      "confirmDelete"
    );

  const cancelBtn =
    document.getElementById(
      "cancelDelete"
    );

  document
    .querySelectorAll(
      ".delete-btn"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.id;

          modal.style.display =
            "flex";

          confirmBtn.onclick =
            async () => {

              await deleteExpense(id);

              showToast(
        "Expense deleted 🗑️"
               );

              modal.style.display =
                "none";

              loadExpenses();

            };

          cancelBtn.onclick =
            () => {

              modal.style.display =
                "none";

            };

        }
      );

    });

}

/* =========================
   EDIT
========================= */

function addEditListeners() {

  const editButtons =
    document.querySelectorAll(".edit-btn");

  editButtons.forEach(button => {

    button.onclick = () => {

      const id =
        button.getAttribute("data-id");

      const expense =
        allExpenses.find(
          exp => exp._id === id
        );

      if (!expense) return;

      document.getElementById("title")
        .value = expense.title;

      document.getElementById("amount")
        .value = expense.amount;

      document.getElementById("people")
        .value =
          expense.people.join(", ");

      document.getElementById("paidBy")
        .value =
          expense.paidBy;

      document.getElementById("category")
        .value =
          expense.category || "";

      document
      .getElementById("title")
      .focus();

      document.getElementById("addBtn")
        .textContent =
          "Update Expense";

      editMode = true;

      currentEditId = id;

    };

  });

}

/* =========================
   CLEAR INPUTS
========================= */

function clearInputs() {

  document.getElementById("title")
    .value = "";

  document.getElementById("amount")
    .value = "";

  document.getElementById("people")
    .value = "";

  document.getElementById("paidBy")
    .value = "";

  document.getElementById("category")
    .value = "";

  document.getElementById(
    "customCategory"
  ).value = "";

  document.getElementById(
    "customCategory"
  ).style.display = "none";

}

/* =========================
   INITIAL LOAD
========================= */

loadExpenses();

/* =========================
   LOGOUT
========================= */

document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "login.html";

});

/* =========================
   DARK MODE
========================= */

const themeBtn =
  document.getElementById(
    "themeBtn"
  );

const savedTheme =
  localStorage.getItem("theme");

if (savedTheme === "dark") {

  document.body.classList.add(
    "dark"
  );

  themeBtn.textContent = "☀️";

}

themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );

    const isDark =
      document.body.classList.contains(
        "dark"
      );

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

    themeBtn.textContent =
      isDark ? "☀️" : "🌙";

});

/* =========================
   SEARCH EXPENSES
========================= */

document
  .getElementById(
    "searchInput"
  )
  .addEventListener(
    "input",
    (e) => {

      const value =
        e.target.value
          .toLowerCase();

      const filtered =
        allExpenses.filter(exp => {

          return (

            exp.title
              .toLowerCase()
              .includes(value)

            ||

            exp.category
              .toLowerCase()
              .includes(value)

            ||

            exp.paidBy
              .toLowerCase()
              .includes(value)

          );

      });

      renderExpenses(filtered);

      addDeleteListeners();

      addEditListeners();

});

/* =========================
   PROFILE INFO
========================= */

const user =
  JSON.parse(
    localStorage.getItem("user")
  );

if (user) {

  document.getElementById(
    "welcomeText"
  ).textContent =

    `Welcome, ${user.name}`;

  document.querySelector(
    ".avatar"
  ).textContent =

    user.name
      .charAt(0)
      .toUpperCase();

}

/* =========================
   DATE FILTER
========================= */

document
  .getElementById(
    "dateFilter"
  )
  .addEventListener(
    "change",
    (e) => {

      const value =
        e.target.value;

      const now =
        new Date();

      let filtered =
        [...allExpenses];

      /* TODAY */

      if (value === "today") {

        filtered =
          allExpenses.filter(exp => {

            const date =
              new Date(
                exp.timestamp
              );

            return (

              date.toDateString()

              ===

              now.toDateString()

            );

          });

      }

      /* THIS WEEK */

      else if (
        value === "week"
      ) {

        filtered =
          allExpenses.filter(exp => {

            const date =
              new Date(
                exp.timestamp
              );

            const diff =
              now - date;

            return (

              diff <=
              7 * 24 * 60 * 60 * 1000

            );

          });

      }

      /* THIS MONTH */

      else if (
        value === "month"
      ) {

        filtered =
          allExpenses.filter(exp => {

            const date =
              new Date(
                exp.timestamp
              );

            return (

              date.getMonth()

              ===

              now.getMonth()

              &&

              date.getFullYear()

              ===

              now.getFullYear()

            );

          });

      }

      /* PREVIOUS MONTH */

      else if (
        value === "previousMonth"
      ) {

        filtered =
          allExpenses.filter(exp => {

            const date =
              new Date(
                exp.timestamp
              );

            const previousMonth =
              now.getMonth() - 1;

            return (

              date.getMonth()

              ===

              previousMonth

              &&

              date.getFullYear()

              ===

              now.getFullYear()

            );

          });

      }

      /* UPDATE UI */

      renderExpenses(filtered);

      renderBalances(filtered);

      renderChart(filtered);

      renderSettlements(filtered);

      renderStats(filtered);

      addDeleteListeners();

      addEditListeners();

});

/* =========================
   AMOUNT VALIDATION
========================= */

document
  .getElementById("amount")
  .addEventListener(
    "input",
    (e) => {

      const value =
        Number(e.target.value);

      if (value <= 0) {

        document
          .getElementById("error")
          .textContent =
            "Amount must be greater than 0";

      }

      else {

        document
          .getElementById("error")
          .textContent = "";

      }

});

