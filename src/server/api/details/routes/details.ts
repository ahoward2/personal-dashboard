import axios from "axios";

/**
 * Aggregates fetches from multiple API endpoints about
 * a user's details.
 */
async function handler(req, res) {
  if (req.method === "GET") {
    // Make Concurrent API calls
    axios
      .all([
        axios.get(`https://api.github.com/users/ahoward2`),
        axios.get(`https://gitlab.com/api/v4/users?username=ahoward21`),
      ])
      .then(
        axios.spread((githubData, gitlabData) => {
          res.json({
            github: githubData.data,
            gitlab: gitlabData.data,
          });
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }
}

export const RouteConfig = {
  path: "/details",
  handler,
};
