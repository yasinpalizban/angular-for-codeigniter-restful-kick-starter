export function urlPath(url: string): string {


  if (url.search('add') !== -1) {
    return 'add';
  } else if (url.search('list') !== -1) {
    return 'list';
  } else if (url.search('detail') !== -1) {
    return 'detail';
  } else if (url.search('edit') !== -1) {
    return 'edit';
  }
  return '';
}
