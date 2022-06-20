export const configureFakeBackend = (url, opts) => {
    return new Promise((resolve, reject) => {
      if (url === `${window.location.origin}/data` && opts.method === 'GET') {
        resolve({ok: true, status: 200, data: JSON.stringify(require('./data.json'))});
        return;
      }
      });
  }