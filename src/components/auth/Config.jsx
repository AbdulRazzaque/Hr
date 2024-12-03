// config.js
const config = {
    baseUrl: process.env.REACT_APP_DEVELOPMENT,
   get accessToken() {
  return sessionStorage.getItem('accessToken') || null // Access the token from sessionStorage
   },
  }
  console.log(config.accessToken,'from local storage')
  export default config;
  

// const config = {
//   baseUrl: process.env.REACT_APP_DEVELOPMENT,
//   get accessToken() {
//     // Dynamically retrieve the token from sessionStorage
//     return sessionStorage.getItem('accessToken') || null;
//   },
// };

// console.log(config.accessToken, 'from local storage');

// export default config;
