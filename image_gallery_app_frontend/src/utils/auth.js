import Cookies from 'js-cookies'

/*  !!! IMPORTANT - THESE COOKIES ARE ONLY SET UP TO GET/SET JWT TOKEN
    ADD MORE COOKIES FOR OTHER FUNCTIONALITY
*/
// Function to set the JWT token in a cookie
export const setToken = (token) => {
  Cookies.setItem('jwt', token, {
    expires: 1, /* expires in 1 day*/
    path: '/',
    secure: false,
    sameSite: 'Strict'
  });
  return true;
};

// Function to get the JWT token from the cookie
export const getToken = () => {
  return Cookies.getItem('jwt');
};
