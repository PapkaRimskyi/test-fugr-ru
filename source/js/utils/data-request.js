export default function fetchDataRequest(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 100000);
  this.loadingIcon();
  return fetch(url, { signal: controller.signal })
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then((result) => {
      this.loadingIcon();
      clearTimeout(timeout);
      this.setState({ errorInfo: { status: false, text: '' }, data: result, userInformation: null });
    })
    .catch((e) => {
      this.loadingIcon();
      clearTimeout(timeout);
      if (e.name === 'AbortError') {
        this.setState({ errorInfo: { status: true, text: 'Время запроса истекло' }, userInformation: null });
        return;
      }
      this.setState({ errorInfo: { status: true, text: e.status ? `Номер ошибки - ${e.status}. ${e.statusText}.` : 'Произошла неизвестная ошибка. Попробуйте позже.' }, userInformation: null });
    });
}
