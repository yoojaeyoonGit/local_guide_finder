let isRefreshing = false;
let refreshPromise = null;

async function tryRefresh() {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = fetch('/api/v1/auth/refresh/', {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function apiFetch(url, options = {}) {
  const { _retry, ...fetchOptions } = options;

  const response = await fetch(url, {
    credentials: 'include',
    ...fetchOptions,
  });

  if ((response.status === 401 || response.status === 403) && !_retry) {
    const refreshResponse = await tryRefresh();

    if (refreshResponse && refreshResponse.ok) {
      return apiFetch(url, { ...fetchOptions, _retry: true });
    }

    window.location.href = '/login';
    return response;
  }

  return response;
}
