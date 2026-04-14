# Github stats
A simple tool to get your github stats and streaks. It uses the [Github GraphQL API](https://docs.github.com/en/graphql) to fetch the data.


# Setup
1. Clone the repository
2. Install the dependencies
```bash
npm install
```
3. Create a `.env` file in the root of the project and add your Github token shown in the `.env.example` file.
4. Start the development server
```bash
npm start
```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# API endpoints
- http://localhost:3000/api/report?user=username - Get github report.
- http://localhost:3000/api/streak?user=username - Get github streaks.
