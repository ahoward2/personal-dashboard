# Composable Personal Dashboard

> Composable dashboard application displaying information about a variety of user accounts. Aggregate data on the Node server from vendor API's and fit the REST API to the frontend client. The Node server also serves the client.

### The Server

- Backend for frontend server built with [Nest.js](https://nestjs.com/).
- A functional approach to Nest with simple route handler functions instead of Nest's traditional providers model (inspired by my [easier-nest-server](https://github.com/ahoward2/easier-nest-server) project).
- Custom in-memory caching (no package dependencies).
- External data retrieved:
  - General github profile information.
  - Github repositories stats.
  - General gitlab profile information.
  - General twitter information.
  - Last 90 tweets twitter stats.

### The Client

- User interface built with [React](https://reactjs.org/).
  - Custom Webpack configuration with [esbuild-loader](https://github.com/privatenumber/esbuild-loader) for ⚡️.
    - Suspense boundary on pages for tiny main bundle (could load pages from remote locations - module federation 😉).
- Client routing with [React Location](https://react-location.tanstack.com/).
  - All data requirements handled at the route level to decouple initiating data fetching from component rendering.
- Client queries and caching with [React Query](https://react-query.tanstack.com/).
  - Caching handled at the route level.
- Terminal inspired design.
  - Styled with [tailwindcss](https://tailwindcss.com/) because it's awesome and super easy to be fast with.
  - Light & dark modes.

### Screenshots

![homepage dark screenshot](public/home-dark.png)
![homepage light screenshot](public/home-light.png)
![dashboard dark screenshot](public/dashboard-dark.png)
![dashboard light screenshot](public/dashboard-light.png)
