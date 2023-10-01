import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function IssueRatio(props) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'new issue vs old issue',
          },
        },
      };
      
      const labels = ['last week', '2nd last week', '3rd last week', '4th last week', '5th last week', '6th last week', '7th last week','8th last week','9th last week','10th last week'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Count of the new issues',
            data: labels.map((label, index) => {
              if (props?.metrics?.weekWiseCount) {
                return props.metrics.weekWiseCount[Number(index) + 1]?.openCount || 0;
              }
              return 0; // Return a default value if weekWiseCount is undefined
            }),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          {
            label: 'Count of the closed issues',
            data: labels.map((label, index) => {
              if (props?.metrics?.weekWiseCount) {
                return props.metrics.weekWiseCount[Number(index) + 1]?.closedCount || 0;
              }
              return 0; // Return a default value if weekWiseCount is undefined
            }),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          },
        ],
      };
  return (
    <Bar options={options} data={data} />
  )
}

export default IssueRatio
