export default function fetchDataRequest(url) {
  this.loadingIcon();
  fetch(url)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then((result) => {
      this.loadingIcon();
      this.setState({ errorInfo: { status: false, text: '' }, data: result });
    })
    .catch((e) => {
      this.loadingIcon();
      this.setState({ errorInfo: { status: true, text: e.status ? `Номер ошибки - ${e.status}. ${e.statusText}.` : 'Произошла неизвестная ошибка. Попробуйте позже.' } });
    });
}
