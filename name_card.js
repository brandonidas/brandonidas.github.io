"use strict";

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

var user = {
  firstName: 'Brandon',
  lastName: 'Tong'
};

var element = React.createElement(
  'h1',
  null,
  'Hello, I\'m ',
  formatName(user),
  '!'
);

ReactDOM.render(element, document.getElementById('name_card'));