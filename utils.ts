export const SERVER_PORT = 5000;
export const REDIS_PORT = 6379;
export const REDIS_EXPIRY_TIME = 2 * 60 * 60;

export enum StatusCodes {
  Success = 200,
  Bad_Request = 400,
  Bad_Server = 500,
}

/**
 * Utility to format the response to send only the required data to the client.
 * @returns Formatted response object
 */
export const formatResponse = (
  type: 'users' | 'repositories' | 'issues',
  resp: any
) => {
  let formattedResp;
  switch (type) {
    case 'users':
      formattedResp = {
        ...resp,
        items: resp.items.map((item: any) => ({
          login: item.login,
          html_url: item.html_url,
          avatar_url: item.avatar_url,
        })),
      };
      break;

    case 'repositories':
      formattedResp = {
        ...resp,
        items: resp.items.map((item: any) => ({
          name: item.name,
          forks: item.forks,
          html_url: item.html_url,
          login: item.owner.login,
          avatar_url: item.owner.avatar_url,
          stargazers_count: item.stargazers_count,
        })),
      };
      break;

    case 'issues':
    default:
      formattedResp = resp;
  }
  return formattedResp;
};
