let chartInstance = null;

export function renderChart(expenses) {

  const categories = {};

  expenses.forEach(exp => {

    const category =
      exp.category || "General";

    categories[category] =
      (categories[category] || 0)
      + exp.amount;

  });

  const labels =
    Object.keys(categories);

  const data =
    Object.values(categories);

  const ctx =
    document
      .getElementById("expenseChart");

  if (!ctx) return;

  if (chartInstance) {

    chartInstance.destroy();

  }

  chartInstance =
    new Chart(ctx, {

      type: "pie",

      data: {

        labels,

        datasets: [

          {

            data

          }

        ]

      },

      options: {

        responsive: true

      }

    });

}