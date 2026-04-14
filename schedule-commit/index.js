import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
// import random from "random";

const path = "./data.json";

const commitMessages = [
  "Fix bug in user authentication",
  "Add new feature for dashboard",
  "Update dependencies",
  "Improve performance",
  "Fix styling issues",
  "Add error handling",
  "Update documentation",
  "Refactor code structure",
  "Fix memory leak",
  "Add unit tests",
  "Update API endpoints",
  "Fix database queries",
  "Improve user interface",
  "Add validation logic",
  "Fix security vulnerability",
  "Update configuration",
  "Add logging functionality",
  "Fix responsive design",
  "Update README",
  "Add new components"
];

const getRandomCommitMessage = () => {
  return commitMessages[Math.floor(Math.random() * commitMessages.length)];
};

const makeCommits = (n, targetDate) => {
  if (n === 0) return simpleGit().push();

  const date = moment(targetDate).format();
  const message = getRandomCommitMessage();

  const data = {
    date: date,
    message: message
  };

  console.log(`${51-n}: ${date} - ${message}`);

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(message, { "--date": date }, makeCommits.bind(this, --n, targetDate));
  });
};

// Change this date to whatever date you want
const YOUR_DATE = ""; // YYYY-MM-DD format
makeCommits(1, YOUR_DATE);
