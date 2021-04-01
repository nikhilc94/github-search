# GitHub search app

- [About](#about)
- [Tech stack](#tech-stack)
- [How to run](#how-to-run)
- [Future enhancements](#future-enhancements)

# About

A single page application which allows the user to search items on GitHub like users, repositories, issues etc. When a user enters a search term of more than 2
characters and a search type, the app automatically calls the [GitHub search API](https://docs.github.com/en/rest/reference/search) via a Node.js server and
displays the results in real time.

### Caching

The app caches the response on back-end using redis which stores the data for 2 hours. Front-end caching is handled via redux & redux-persist which ensure that
API calls are not made for previously fetched results.

### Search UI/UX

The search functionality is handled without a search button. When the user stops typing, the search is made automatically as the typing is debounced with a 750ms of delay.

# Tech stack

- Node.js with Express
- Redis
- React
- TypeScript
- Redux
- SCSS
- Jest & SuperTest

# How to run

- Clone the app

- Install dependencies in the server folder (/) and the client folder (/client):

```sh
npm i
cd client/
npm i
cd ../
```

- (Optional - to enable server side caching) Run an unauthenticated redis server locally on it's default port 6379

```sh
redis-server
```

- Run the below command to start the server on port 5000 & client on port 3000

```sh
npm run dev
```

- To access the app open http://localhost:3000/

- To access the swagger documentation open http://localhost:5000/api-docs/

- To create a production build set the environment variable NODE_ENV = "production" and run the below commands

```sh
npm run build
npm run start
```

# Future enhancements

- Add more unit tests
- Set expiry time on front-end cache
- Add a toggle to enable/disable dark mode on the app
- Create a component storybook
- UI improvements
