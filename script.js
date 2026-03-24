let chart;

function loadChart() {
  const fileInput = document.getElementById("fileInput");
  const chartType = document.getElementById("chartType").value;

  const file = fileInput.files[0];
  if (!file) {
    alert("Please upload a CSV file first!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const text = event.target.result;
    const rows = text.split("\n").map(r => r.split(","));

    const labels = [];
    const values = [];

    rows.forEach(row => {
      labels.push(row[0]);
      values.push(Number(row[1]));
    });

    drawChart(labels, values, chartType);
  };

  reader.readAsText(file);
}

function drawChart(labels, data, type) {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: "My Data",
        data: data
      }]
    }
  });
}
