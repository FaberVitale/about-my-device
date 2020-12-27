export class FetchResponseError extends Error {
  readonly type: Response['type'];
  readonly status: Response['status'];
  readonly statusText: Response['statusText'];
  readonly url: Response['url'];

  constructor(response: Response) {
    super(`fetch response error, http status ${response.statusText}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchResponseError);
    }

    this.name = 'FetchResponseError';
    this.type = response.type;
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
  }
}

export function fetchJson<T>(url: string, init?: RequestInit | undefined) {
  const fetchConfig = {
    ...init,
  };

  let headers: Headers;

  if (fetchConfig.headers instanceof Headers) {
    headers = new Headers();

    fetchConfig.headers.forEach((value, key) => {
      headers.set(key, value);
    });
  } else if (typeof fetchConfig.headers === 'object' && fetchConfig.headers) {
    headers = new Headers(fetchConfig.headers);
  } else {
    headers = new Headers();
  }

  headers.set('accept', 'application/json');

  fetchConfig.headers = headers;

  return fetch(url, fetchConfig).then((response) => {
    if (response.ok) {
      return response.json() as Promise<T>;
    }

    throw new FetchResponseError(response);
  });
}
