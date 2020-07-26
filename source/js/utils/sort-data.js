export default function sortData(data, sortType, sortDirection) {
  if (sortDirection) {
    switch (sortType) {
      case 'id':
        return data.sort((a, b) => a.id - b.id);
      case 'firstName':
      case 'lastName':
      case 'email':
        return data.sort((a, b) => {
          if (a[sortType] > b[sortType]) {
            return 1;
          } if (a[sortType] < b[sortType]) {
            return -1;
          }
          return 0;
        });
      case 'phone':
        return data.sort((a, b) => a.phone.replace(/[^\d]/g, '') - b.phone.replace(/[^\d]/g, ''));
      default:
        return data;
    }
  }
  return data.reverse();
}
