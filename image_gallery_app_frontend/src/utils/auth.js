import Cookies from 'js-cookies'

/*  !!! IMPORTANT - THESE COOKIES ARE ONLY SET UP TO GET/SET JWT TOKEN
    ADD MORE COOKIES FOR OTHER FUNCTIONALITY
*/
// Function to set the User token in a cookie
export const setUser = (user) => {
  Cookies.setItem('IAGUser', user, {
    expires: 1, /* expires in 1 day*/
    path: '/',
    secure: false,
    sameSite: 'Strict'
  });
  return true;
};

// Function to get the User token from the cookie
export const getUser = () => {
  return Cookies.getItem('IAGUser');
};
