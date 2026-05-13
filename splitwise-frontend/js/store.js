const token =
  localStorage.getItem("token");

const BASE_URL = "https://splitledger-backend-u7lw.onrender.com";

export async function getExpenses() {

  try {

    const token =
      localStorage.getItem("token");

    const res = await fetch(
      BASE_URL,
      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }
    );

    if (!res.ok) {

      throw new Error(
        "Failed to fetch expenses"
      );

    }

    return await res.json();

  }

  catch (error) {

    console.error(error);

    return [];

  }

}

export async function addExpense(expense) {

  try {

    const token =
      localStorage.getItem("token");

    const res = await fetch(BASE_URL, {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

        Authorization: `Bearer ${token}`

      },

      body:
        JSON.stringify(expense)

    });

    if (!res.ok) {

      throw new Error(
        "Failed to add expense"
      );

    }

    return await res.json();

  }

  catch (error) {

    console.error(error);

  }

}

export async function deleteExpense(id) {

  try {

    const token =
      localStorage.getItem("token");

    const res = await fetch(

      `${BASE_URL}/${id}`,

      {

        method: "DELETE",

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    if (!res.ok) {

      throw new Error(
        "Failed to delete expense"
      );

    }

    return await res.json();

  }

  catch (error) {

    console.error(error);

  }

}

export async function updateExpense(
  id,
  expense
) {

  try {

    const token =
      localStorage.getItem("token");

    const res = await fetch(

      `${BASE_URL}/${id}`,

      {

        method: "PUT",

        headers: {

          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`

        },

        body:
          JSON.stringify(expense)

      }

    );

    if (!res.ok) {

      throw new Error(
        "Failed to update expense"
      );

    }

    return await res.json();

  }

  catch (error) {

    console.error(error);

  }

}