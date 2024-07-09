import Cookies from 'js-cookies'

/*  !!! IMPORTANT - THESE COOKIES ARE ONLY SET UP TO GET/SET JWT TOKEN
    ADD MORE COOKIES FOR OTHER FUNCTIONALITY
*/
// Function to set the JWT token in a cookie
export const setToken = (token) => {
  Cookies.set('jwt', token, {
    expires: 1, /* expires in 1 day*/
    path: '/',
    secure: false,
    sameSite: 'Strict'
  });
};
// Function to get the JWT token from the cookie
export const getToken = () => {
  return Cookies.get('jwt');
};
