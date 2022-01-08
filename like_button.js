"use strict";

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);

// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
//   }
  
//   const user = {
//     firstName: 'Harper',
//     lastName: 'Perez',
//   };
  
//   const element = <h1>Hello, {formatName(user)}!</h1>;
  
//   ReactDOM.render(element, document.getElementById('root'));
  