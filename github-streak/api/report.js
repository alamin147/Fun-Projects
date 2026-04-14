let cache = {};

// Helper to format large numbers
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

// Calculate rating based on weighted score (commits prioritized)
function calculateRating(totalCommits, totalStars, totalPRs, totalIssues, followers) {
  // Weighted scoring: Commits 40%, Stars 20%, PRs 15%, Issues 15%, Followers 10%
  const commitScore = Math.min(totalCommits / 1000, 10);
  const starScore = Math.min(totalStars / 500, 10);
  const prScore = Math.min(totalPRs / 100, 10);
  const issueScore = Math.min(totalIssues / 50, 10);
  const followerScore = Math.min(followers / 100, 10);

  const totalScore = (commitScore * 4 + starScore * 2 + prScore * 1.5 + issueScore * 1.5 + followerScore * 1) / 10;

  if (totalScore >= 9) return "S";
  if (totalScore >= 8) return "A++";
  if (totalScore >= 6.5) return "A+";
  if (totalScore >= 5) return "A";
  if (totalScore >= 3.5) return "B+";
  if (totalScore >= 2) return "B";
  return "C";
}

export default async function handler(req, res) {
  const username = req.query.user || "octocat";
  const theme = req.query.theme || "dark";

  const themes = {
    dark: { bg: "#0d1117", text: "#ffffff", sub: "#8b949e", accent: "#ff006e" },
    light: { bg: "#ffffff", text: "#000000", sub: "#57606a", accent: "#ff006e" }
  };
  const t = themes[theme] || themes.dark;

  const cacheKey = `stats-${username}-${theme}`;

  if (cache[cacheKey] && Date.now() - cache[cacheKey].time < 3600000) {
    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(cache[cacheKey].data);
  }

  try {
    // 🔹 STEP 1: Get all years
    const yearsQuery = `
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionYears
        }
      }
    }`;

    const yearsRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query: yearsQuery })
    });

    const yearsData = await yearsRes.json();
    if (!yearsData.data?.user) throw new Error("User not found");

    const years = yearsData.data.user.contributionsCollection.contributionYears;

    // 🔹 STEP 2: Get total contributions across all years (public + private)
    let totalContributionsAllTime = 0;

    for (const year of years) {
      const yearlyQuery = `
      {
        user(login: "${username}") {
          contributionsCollection(
            from: "${year}-01-01T00:00:00Z",
            to: "${year}-12-31T23:59:59Z"
          ) {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`;

      const resYear = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({ query: yearlyQuery })
      });

      const dataYear = await resYear.json();
      totalContributionsAllTime +=
        dataYear.data.user.contributionsCollection.contributionCalendar
          .totalContributions;
    }

    // 🔹 STEP 3: Fetch all repositories
    const query = `
    {
      user(login: "${username}") {
        name
        repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
          totalCount
          nodes {
            stargazerCount
            forkCount
            isPrivate
            owner {
              login
            }
          }
        }
      }
    }`;

    const res1 = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query })
    });

    const data1 = await res1.json();
    if (!data1.data?.user) throw new Error("User not found");

    let totalStars = 0;
    const ownedRepos = new Set();

    data1.data.user.repositories.nodes.forEach((repo) => {
      if (repo.owner.login === username) {
        totalStars += repo.stargazerCount;
        ownedRepos.add(repo.owner.login);
      }
    });

    // Fetch commits, contributions, and followers
    const query2 = `
    {
      user(login: "${username}") {
        followers {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalRepositoriesWithContributedCommits
          totalRepositoriesWithContributedIssues
          totalRepositoriesWithContributedPullRequests
        }
      }
    }`;

    const res2 = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query: query2 })
    });

    const data2 = await res2.json();
    const contrib = data2.data.user.contributionsCollection;
    const followers = data2.data.user.followers.totalCount;

    const totalCommits = contrib.totalCommitContributions;
    const totalPRs = contrib.totalPullRequestContributions;
    const totalIssues = contrib.totalIssueContributions;

    const uniqueRepos = Math.max(
      contrib.totalRepositoriesWithContributedCommits,
      contrib.totalRepositoriesWithContributedPullRequests,
      contrib.totalRepositoriesWithContributedIssues
    );

    const rating = calculateRating(totalContributionsAllTime, totalStars, totalPRs, totalIssues, followers);

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation: isolate" viewBox="0 0 520 210" width="520px" height="210px" direction="ltr">
  <defs>
    <clipPath id="outer_rectangle_report">
      <rect width="520" height="210" rx="4.5"/>
    </clipPath>
    <symbol id="star-icon" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.35 12 18.54 3.84 24.35 6.23 16.01 0 10.35 8.91 10.26 12 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
    </symbol>
    <symbol id="commit-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
      <line x1="3" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="15" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>
    <symbol id="pr-icon" viewBox="0 0 24 24">
      <circle cx="6" cy="6" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="18" cy="12" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
      <line x1="8" y1="6" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="8" y1="18" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>
    <symbol id="issue-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>
    <symbol id="followers-icon" viewBox="0 0 24 24">
      <circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M2 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="16" cy="9" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M13 20c0-2.485 1.791-4.553 4-4.9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="20" cy="9" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M17 20c0-2.485 1.791-4.553 4-4.9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
    </symbol>
  </defs>

  <style>
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes slideIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .title { font: bold 17px "Segoe UI", Ubuntu, sans-serif; fill: ${t.text}; font-weight: 700; animation: fadeIn 0.5s linear forwards; }
    .stat-value { font: bold 17px "Segoe UI", Ubuntu, sans-serif; fill: ${t.text}; animation: slideIn 0.5s ease-out forwards; }
    .stat-label { font: 11px "Segoe UI", Ubuntu, sans-serif; fill: ${t.sub}; font-weight: 600; animation: fadeIn 0.5s linear forwards; }
    .icon-group { color: #FB8C00; }
    .rating-circle-label { font: 11px "Segoe UI", Ubuntu, sans-serif; fill: #FB8C00; font-weight: 600; text-anchor: middle; animation: fadeIn 0.5s linear forwards; }
    .rating-text { font: bold 33px "Segoe UI", Ubuntu, sans-serif; fill: #FB8C00; text-anchor: middle; animation: fadeIn 0.5s linear forwards; }
  </style>

  <g clip-path="url(#outer_rectangle_report)">
    <!-- Background -->
    <g style="isolation: isolate">
      <rect stroke="#E4E2E2" fill="${t.bg}" rx="4.5" x="0.5" y="0.5" width="519" height="209"/>
    </g>

    <!-- Vertical divider -->
    <line x1="350" y1="30" x2="350" y2="185" vector-effect="non-scaling-stroke" stroke-width="1" stroke="#E4E2E2" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>

    <!-- Title -->
    <g style="animation-delay: 0s">
      <text x="20" y="45" class="title" style="opacity: 0; animation: fadeIn 0.5s linear forwards 0.3s">
        GitHub Stats
      </text>
    </g>

    <!-- Stats Section Left -->
    <g style="isolation: isolate">
      <!-- Row 1: Stars -->
      <g style="animation-delay: 0.4s; opacity: 0; animation: slideIn 0.5s ease-out forwards 0.4s">
        <g class="icon-group" transform="translate(28, 70)">
          <use href="#star-icon" width="10" height="10"/>
        </g>
        <text x="42" y="74" class="stat-label">Stars</text>
        <text x="42" y="89" class="stat-value">${formatNumber(totalStars)}</text>
      </g>

      <!-- Row 2: Commits (All-Time Total) -->
      <g style="animation-delay: 0.5s; opacity: 0; animation: slideIn 0.5s ease-out forwards 0.5s">
        <g class="icon-group" transform="translate(28, 110)">
          <use href="#commit-icon" width="10" height="10"/>
        </g>
        <text x="42" y="114" class="stat-label">Commits</text>
        <text x="42" y="129" class="stat-value">${formatNumber(totalContributionsAllTime)}</text>
      </g>

      <!-- Row 3: PRs -->
      <g style="animation-delay: 0.6s; opacity: 0; animation: slideIn 0.5s ease-out forwards 0.6s">
        <g class="icon-group" transform="translate(28, 150)">
          <use href="#pr-icon" width="10" height="10"/>
        </g>
        <text x="42" y="154" class="stat-label">PR</text>
        <text x="42" y="169" class="stat-value">${formatNumber(totalPRs)}</text>
      </g>

      <!-- Row 1 Right: Issues -->
      <g style="animation-delay: 0.7s; opacity: 0; animation: slideIn 0.5s ease-out forwards 0.7s">
        <g class="icon-group" transform="translate(180, 70)">
          <use href="#issue-icon" width="10" height="10"/>
        </g>
        <text x="194" y="74" class="stat-label">Issues</text>
        <text x="194" y="89" class="stat-value">${formatNumber(totalIssues)}</text>
      </g>

      <!-- Row 2 Right: Followers -->
      <g style="animation-delay: 0.8s; opacity: 0; animation: slideIn 0.5s ease-out forwards 0.8s">
        <g class="icon-group" transform="translate(180, 110)">
          <use href="#followers-icon" width="10" height="10"/>
        </g>
        <text x="194" y="114" class="stat-label">Followers</text>
        <text x="194" y="129" class="stat-value">${formatNumber(followers)}</text>
      </g>
    </g>

    <!-- Rating Section -->
    <g style="isolation: isolate">
      <!-- Ring around rating -->
      <circle cx="420" cy="110" r="42" fill="none" stroke="#FB8C00" stroke-width="3" style="opacity: 0; animation: fadeIn 0.5s linear forwards 0.5s"/>
      <circle cx="420" cy="110" r="37" fill="none" stroke="#FB8C00" stroke-width="1" opacity="0.2" style="opacity: 0; animation: fadeIn 0.5s linear forwards 0.5s"/>

      <!-- Rating Label -->
      <text x="420" y="98" class="rating-circle-label" style="opacity: 0; animation: fadeIn 0.5s linear forwards 0.6s">Rating</text>

      <!-- Rating Value -->
      <text x="420" y="123" class="rating-text" style="opacity: 0; animation: fadeIn 0.5s linear forwards 0.7s">
        ${rating}
      </text>
    </g>
  </g>
</svg>
`;

    cache[cacheKey] = {
      data: svg,
      time: Date.now()
    };

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (err) {
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(`
<svg width="400" height="100">
  <text x="20" y="50" fill="red">⚠️ ${err.message}</text>
</svg>
`);
  }
}
