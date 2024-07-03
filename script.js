// Changing table chart --------------------------------------------------------->

// getting data from API to build a  live changing chart
const urlApi = 'https://canvasjs.com/services/data/datapoints.php';
    let xValues = [];
    let yValues = [];
    let myChangingChart ;

async function getDataApi() {
    const response = await fetch(urlApi,{cache: "no-store" });
    const dataApi = await response.json();

    xValues = [];
    yValues = [];

    dataApi.forEach(value => {
        xValues.push(value[0]);
        yValues.push(value[1]);
    });
};


async function createChart() {
    await getDataApi();
    const ctx3 = document.getElementById('APIchart');
    myChangingChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'Live Data',
                data: yValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

createChart();

async function updateChart() {
    // Fetch new data
    await getDataApi();

    // Update the chart's data
    myChangingChart.data.labels = xValues;
    myChangingChart.data.datasets[0].data = yValues;

    // Redraw the chart
    myChangingChart.update();
}

// Update the chart every 2 seconds
setInterval(updateChart, 2000);






// Second table chart --------------------------------------------------------->


// Function to extract data from the second table
function getDataFromTable2(tableId) {
    const table = document.getElementById(tableId);      
    const labels = [];      
    const data2007_09 = [];      
    const data2010_12 = [];
          
// rows of the table body          
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            labels.push(cells[0].innerText);  // First cell is the label (country)
            data2007_09.push(parseInt(cells[1].innerText));
            data2010_12.push(parseInt(cells[2].innerText));  
        }

        return { labels, data2007_09, data2010_12 };
};

// Extract data from the table
    const tableData2 = getDataFromTable2('table2');

// Create second chart
      const ctx2 = document.getElementById('mysecondChart');
      const myChart2 = new Chart(ctx2, {
          type: 'bar',  
          data: {
              labels: tableData2.labels,
              datasets: [
                  {
                      label: '2007-09',
                      data: tableData2.data2007_09,
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                  },
                  {
                      label: '2010-12',
                      data: tableData2.data2010_12,
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                  }
              ]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });






// First table chart ------------------------------------------------------------->

//select first table
const table = document.getElementById('table1');

// Initialize arrays for labels (countries) and data (values by year)
let labels = [];
let data = [];

// Iterate through rows (skipping the first two rows)
for (let i = 2; i < table.rows.length; i++) {
    const row = table.rows[i];
    const country = row.cells[1].textContent.replace(/[^a-zA-Z]+/g, '');  
    labels.push(country);

    const rowData = [];
    for (let j = 2; j < row.cells.length; j++) {
        const value = parseFloat(row.cells[j].textContent.replace(',', '.')); // Convert to number
        rowData.push(value);
    }
    data.push(rowData);
}

// organize datasets for Chart
const datasets = [];
for (let i = 0; i < data.length; i++) {
    datasets.push({
        label: labels[i],
        data: data[i],
        backgroundcolor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        tension: 0.1
    });
}



// create first chart 
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        datasets: datasets,  
    },
    options: {
      indexAxis: 'y',
      barPercentage: 1,
      categoryPercentage: 0.9,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
    


