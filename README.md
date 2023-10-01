# GitHub Issue Tracker

## Overview

The GitHub Issue Tracker is a web application that allows you to explore and analyze issues from any GitHub repository. You can provide the name of a GitHub repository, and the application will fetch and display the latest 1000 issues from that repository. Additionally, the application provides various metrics for the fetched 1000 issues and insights related to the issues within the repository.

## Features

- **Issue Listing**: View a list of the latest 1000 issues from a GitHub repository.

- **Metrics and Insights**: Gain insights into the issues, including:
  - Status-wise count of issues (Open and Closed).
  - Week-wise issue count for the last 10 weeks.
  - Ratio of new issues vs. closed issues per week.
  - Weekly Closure Rate for each week.

- **Sorting and Filtering**: Get the complete list of the issue and you can sort it based on creation date.

## Usage

1. Visit the GitHub Issue Tracker website.

2. Enter the details of the GitHub repository like the name of the organisation/owner and the repository name you want to explore.

3. Click the "Show Metrics" button to retrieve the latest 1000 issues metrics from the repository.

4. Explore the list of issues by clicking on the "Show List" button

5. Sort the issue based on the creation date in ascending and decending order.

7. Use pagination to explore all the issue in the repository.

## Technologies Used

- Vite based React App.
- react-chartjs-2 to make the charts. 
- Other UI components

## Development Environment

If you want to run the GitHub Issue Tracker locally or contribute to its development, follow these steps:

1. Clone the GitHub repository.

2. Install the required dependencies using npm.

3. Get the github token and add it in the .env file.

3. Start the development server using npm run dev.

4. Customize and enhance the application as needed.

## Author

Neha Malvia
