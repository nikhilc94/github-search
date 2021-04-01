import cors from 'cors';
import path from 'path';
import axios from 'axios';
import redis from 'redis';
import express from 'express';
import { promisify } from 'util';
import swaggerUi from 'swagger-ui-express';

import {
  REDIS_PORT,
  SERVER_PORT,
  StatusCodes,
  formatResponse,
  REDIS_EXPIRY_TIME,
} from './utils';
const swaggerDocument = require(path.join(process.cwd(), '/swagger.json'));

// Express server configs & middlewares
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Redis config
const client = redis.createClient(REDIS_PORT);
const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.setex).bind(client);
const redisQuit = promisify(client.quit).bind(client);
const redisClear = promisify(client.flushall).bind(client);

client.on('error', (err) => {
  console.log(err);
});

/**
 * API to search for users/repos/issues on GitHub.
 * @method POST
 * @name /api/search
 * @param {string} type - GitHub item type to search
 * @param {string} text - Search string
 * @returns {JSON} Data Object
 */

interface SearchRequest {
  type: 'users' | 'repositories' | 'issues';
  text: string;
}

app.post('/api/search', async (req, res) => {
  // Handling bad requests
  const { type, text } = req.body as SearchRequest;
  if (!text || !['users', 'repositories', 'issues'].includes(type)) {
    return res
      .status(StatusCodes.Bad_Request)
      .json({ message: 'Invalid search type/search string!' });
  }

  const redisKey = `${type}-${text}`;

  // Checking if the redis connection exists
  if (client.connected) {
    const cachedData = await redisGet(redisKey);
    if (cachedData) {
      return res.status(StatusCodes.Success).json(JSON.parse(cachedData));
    }
  }

  // Retrieving data from the GitHub API
  const resp = await axios.get(
    `https://api.github.com/search/${type}?q=${text}`
  );

  const formattedResp = formatResponse(type, resp.data);

  res.status(StatusCodes.Success).json(formattedResp);
  await redisSet(redisKey, REDIS_EXPIRY_TIME, JSON.stringify(formattedResp));
});

/**
 * API endpoint to clear the stored redis cached searches.
 * @method GET
 * @name /api/clear-cache
 * @returns
 */

app.get('/api/clear-cache', async (req, res) => {
  if (client.connected) {
    const clearResp = await redisClear();
    console.log(clearResp);
    if (clearResp === 'OK') {
      return res
        .status(StatusCodes.Success)
        .json({ message: 'Redis cache cleared!' });
    }
  }
  res
    .status(StatusCodes.Bad_Server)
    .json({ message: 'Unable to clear redis cache!' });
});

/**
 * API to serve production build of client react app.
 * @method GET
 * @name /
 * @returns {HTML}
 */

app.get(['/', '/results'], (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Closing redis connection on server shutdown
async function cleanup() {
  if (client.connected) {
    await redisQuit();
  }
  process.exit();
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Starting server
app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
