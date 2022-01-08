"use strict";

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Brandon',
  lastName: 'Tong'
};

const element = (
  <h1>
    Hello, I'm {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('name_card')
);
