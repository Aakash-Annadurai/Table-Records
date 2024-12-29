export function areAllKeysEmpty(obj) {
    return Object.values(obj).every(
      (value) =>
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" &&
          value !== null &&
          Object.keys(value).length === 0)
    );
  }


  export   const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });}

 export const scrollTobottom = () => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });}