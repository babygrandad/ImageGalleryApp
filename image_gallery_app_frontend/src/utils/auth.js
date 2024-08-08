import Cookies from 'js-cookies'

/*  !!! IMPORTANT - THESE COOKIES ARE ONLY SET UP TO GET/SET JWT TOKEN
    ADD MORE COOKIES FOR OTHER FUNCTIONALITY
*/
// Function to set the User token in a local Storage
export const setUser = (user) => {
  user = JSON.stringify(user);
  localStorage.setItem('IAGUser', user, {
    expires: 1, /* expires in 1 day*/
    path: '/',
    secure: false,
    sameSite: 'Strict'
  });
  return true;
};

// Function to get the User token from the Local Storage
export const getUser = () => {
  var user = localStorage.getItem('IAGUser');
  return JSON.parse(user);
};
