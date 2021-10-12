export function explodeUrl(url: string): string[] {
  let explodeLink: string[] = [];

  let upper = '';
  let lower = '';
  let length = 0;
  url = url.substring(1, url.length);
  if (url.indexOf('?')) {
    explodeLink = url.split('?');
    explodeLink = explodeLink[0].split('/');
  } else {
    explodeLink = url.split('/');
  }
  for (let i = 0; i < explodeLink.length; i++) {

    const isNum = explodeLink[i].match(/^[0-9]+$/) != null;

    if (!isNum) {

      upper = explodeLink[i].charAt(0).toUpperCase();
      length = explodeLink[i].length;
      lower = explodeLink[i].substring(1, length);
      explodeLink[i] = upper + lower;
    } else {
      delete explodeLink[i];
    }

  }

  return explodeLink;
}
