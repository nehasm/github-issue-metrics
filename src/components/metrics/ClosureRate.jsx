
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function ClosureRate(props) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Closure Rate of each week',
          },
        },
      };
      
      const labels = ['last week', '2nd last week', '3rd last week', '4th last week', '5th last week', '6th last week', '7th last week','8th last week','9th last week'];
      
    const data = {
        labels,
        datasets: [
          {
            label: 'closure rate',
            data: labels.map((label, index) => {
                if (props?.metrics?.weekWiseCount) {
                  return props.metrics.weekWiseCount[Number(index) + 1]?.closureRate || 0;
                }
                return 0; // Return a default value if weekWiseCount is undefined
              }),
            borderColor: 'rgba(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
          }
        ],
      };
  return (
    <Line options={options} data={data} />
  )
}

export default ClosureRate




