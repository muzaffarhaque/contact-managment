import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function LineGraph() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Confirmed Cases",
        data: [],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: "Deaths",
        data: [],
        borderColor: 'red',
        fill: false,
      },
      {
        label: "Recovered",
        data: [],
        borderColor: 'green',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const responseData = await response.json();

        const casesData = Object.entries(responseData.cases || {}).map(([date, cases]) => ({ date, cases }));
        const deathsData = Object.entries(responseData.deaths || {}).map(([date, deaths]) => ({ date, deaths }));
        const recoveredData = Object.entries(responseData.recovered || {}).map(([date, recovered]) => ({ date, recovered }));

        setData((prevData:any) => ({
          ...prevData,
          labels: casesData.map(dataPoint => dataPoint.date),
          datasets: [
            { ...prevData.datasets[0], data: casesData.map(dataPoint => dataPoint.cases) },
            { ...prevData.datasets[1], data: deathsData.map(dataPoint => dataPoint.deaths) },
            { ...prevData.datasets[2], data: recoveredData.map(dataPoint => dataPoint.recovered) },
          ],
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Don't maintain aspect ratio
  };

  return (
    <div className="LineGraph" style={{ width: '100%' }}>
      <Line data={data} options={chartOptions} />
    </div>
  );
}

export default LineGraph;
