let cache = {};

export default async function handler(req, res) {
  const username = req.query.user || "octocat";
  const theme = req.query.theme || "dark";

  const themes = {
    dark: { bg: "#0d1117", text: "#ffffff", sub: "#8b949e" },
    light: { bg: "#ffffff", text: "#000000", sub: "#57606a" }
  };
  const t = themes[theme] || themes.dark;

  const cacheKey = `${username}-${theme}`;

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

    const years =
      yearsData.data.user.contributionsCollection.contributionYears;

    // 🔹 STEP 2: Total contributions
    let totalAll = 0;

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

      totalAll +=
        dataYear.data.user.contributionsCollection.contributionCalendar
          .totalContributions;
    }

    // 🔹 STEP 3: First contribution date
    let firstContributionDate = null;
    const sortedYears = [...years].sort((a, b) => a - b);

    for (const year of sortedYears) {
      const query = `
      {
        user(login: "${username}") {
          contributionsCollection(
            from: "${year}-01-01T00:00:00Z",
            to: "${year}-12-31T23:59:59Z"
          ) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
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
        body: JSON.stringify({ query })
      });

      const dataYear = await resYear.json();

      const weeks =
        dataYear.data.user.contributionsCollection.contributionCalendar.weeks;

      const days = weeks.flatMap((w) => w.contributionDays);

      const firstDay = days.find((d) => d.contributionCount > 0);

      if (firstDay) {
        firstContributionDate = firstDay.date;
        break;
      }
    }

    // 🔹 STEP 4: Streak data
    const streakQuery = `
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }`;

    const streakRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query: streakQuery })
    });

    const streakData = await streakRes.json();

    const weeks =
      streakData.data.user.contributionsCollection.contributionCalendar.weeks;

    const allDays = weeks.flatMap((w) => w.contributionDays);

    // 🔥 CURRENT STREAK
    let current = 0;
    let currentStart = null;
    let started = false;

    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) {
        current++;
        currentStart = allDays[i].date;
        started = true;
      } else if (started) {
        break;
      }
    }

    // 🏆 LONGEST STREAK
    let longest = 0;
    let temp = 0;

    let longestStart = null;
    let longestEnd = null;
    let tempStart = null;

    for (let i = 0; i < allDays.length; i++) {
      if (allDays[i].contributionCount > 0) {
        temp++;

        if (temp === 1) tempStart = allDays[i].date;

        if (temp > longest) {
          longest = temp;
          longestStart = tempStart;
          longestEnd = allDays[i].date;
        }
      } else {
        temp = 0;
        tempStart = null;
      }
    }

    // 🔹 Format date
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }

    const startDate = firstContributionDate
      ? formatDate(firstContributionDate)
      : "N/A";

    const currentStartDate = currentStart ? formatDate(currentStart) : "N/A";
    const longestStartDate = longestStart ? formatDate(longestStart) : "N/A";
    const longestEndDate = longestEnd ? formatDate(longestEnd) : "N/A";

    // 🎯 FIX: if current streak is 1 → show only one date
    const currentDisplay =
      current <= 1
        ? currentStartDate
        : `${currentStartDate} - Present`;

//     // 🎨 SVG
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation: isolate" viewBox="0 0 495 195" width="495px" height="195px" direction="ltr">
  <style>
    @keyframes currstreak {
      0% { font-size: 3px; opacity: 0.2; }
      80% { font-size: 34px; opacity: 1; }
      100% { font-size: 28px; opacity: 1; }
    }
    @keyframes fadein {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  </style>
  <defs>
    <clipPath id="outer_rectangle">
      <rect width="495" height="195" rx="4.5"/>
    </clipPath>
    <mask id="mask_out_ring_behind_fire">
      <rect width="495" height="195" fill="white"/>
      <ellipse id="mask-ellipse" cx="247.5" cy="32" rx="13" ry="18" fill="black"/>
    </mask>
  </defs>

  <g clip-path="url(#outer_rectangle)">
    <g style="isolation: isolate">
      <rect stroke="#E4E2E2" fill="${t.bg}" rx="4.5" x="0.5" y="0.5" width="494" height="194"/>
    </g>
    <g style="isolation: isolate">
      <line x1="165" y1="28" x2="165" y2="170" vector-effect="non-scaling-stroke" stroke-width="1" stroke="#E4E2E2" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
      <line x1="330" y1="28" x2="330" y2="170" vector-effect="non-scaling-stroke" stroke-width="1" stroke="#E4E2E2" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
    </g>

    <!-- TOTAL CONTRIBUTIONS SECTION -->
    <g style="isolation: isolate">
      <g transform="translate(82.5, 48)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.text}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="700" font-size="28px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 0.6s">
          ${totalAll.toLocaleString()}
        </text>
      </g>
      <g transform="translate(82.5, 100)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.text}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="400" font-size="14px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 0.7s">
          Total Contributions
        </text>
      </g>
      <g transform="translate(82.5, 130)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.sub}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="400" font-size="12px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 0.8s">
          ${startDate} - Present
        </text>
      </g>
    </g>

    <!-- CURRENT STREAK SECTION -->
    <g style="isolation: isolate">
      <g transform="translate(247.5, 100)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="#FB8C00" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="700" font-size="14px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 0.9s">
          Current Streak
        </text>
      </g>
      <g transform="translate(247.5, 130)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.sub}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="400" font-size="12px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 0.9s">
          ${currentDisplay}
        </text>
      </g>

      <!-- Ring around number -->
      <g mask="url(#mask_out_ring_behind_fire)">
        <circle cx="247.5" cy="71" r="40" fill="none" stroke="#FB8C00" stroke-width="5" style="opacity: 0; animation: fadein 0.5s linear forwards 0.4s"/>
      </g>

      <!-- Fire icon -->
      <g transform="translate(247.5, 19.5)" stroke-opacity="0" style="opacity: 0; animation: fadein 0.5s linear forwards 0.6s">
        <path d="M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z" fill="none"/>
        <path d="M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z" fill="#FB8C00" stroke-opacity="0"/>
      </g>

      <!-- Current Streak big number -->
      <g transform="translate(247.5, 48)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.text}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="700" font-size="28px" font-style="normal" style="animation: currstreak 0.6s linear forwards">
          ${current}
        </text>
      </g>
    </g>

    <!-- LONGEST STREAK SECTION -->
    <g style="isolation: isolate">
      <g transform="translate(412.5, 48)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.text}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="700" font-size="28px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 1.2s">
          ${longest}
        </text>
      </g>
      <g transform="translate(412.5, 100)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.text}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="400" font-size="14px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 1.3s">
          Longest Streak
        </text>
      </g>
      <g transform="translate(412.5, 130)">
        <text x="0" y="32" stroke-width="0" text-anchor="middle" fill="${t.sub}" stroke="none" font-family="&quot;Segoe UI&quot;, Ubuntu, sans-serif" font-weight="400" font-size="12px" font-style="normal" style="opacity: 0; animation: fadein 0.5s linear forwards 1.4s">
          ${longestStartDate} - ${longestEndDate}
        </text>
      </g>
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
  <text x="20" y="50">⚠️ ${err.message}</text>
</svg>
`);
  }
}
