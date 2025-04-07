import React, { Component } from 'react';

export default class AboutUs extends Component {
  render() {
    return (
      <div className="about">
        <h1>About Us</h1>
        <h3>
          Hey, my name is Tatiana, let&apos;s get acquainted. For a long time I am studying software
          development, this work is made to study React. Please check and evaluate the work I made.
          You can contact me as it will be more convenient for you.
        </h3>

        <ul>
          <li>
            <a href="https://t.me/tanyabogdanovich">Telegram</a>
          </li>
          <li>
            <a href="https://discordapp.com/users/tatianabogdanovich#1375/">Discord</a>
          </li>
          <li>
            <a href="mailto:kulinkovich56@gmail.com">Gmail</a>
          </li>
        </ul>
      </div>
    );
  }
}
