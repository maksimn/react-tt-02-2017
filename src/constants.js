export const dataUrl = 'https://jsonplaceholder.typicode.com/photos';
export const numImgsOnPage = 50;
const hash = window.location.hash;
export const initPageNum = hash.length <= 2 ? 1 : parseInt(hash.substring(2));
