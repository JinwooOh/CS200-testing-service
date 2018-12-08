// for invalid URL route

import React from 'react';

const NotFound = () => (
  <div className="notFound">
    <h1 className="notFound__title">Sorry, page not found</h1>

    <button
      className="btn btn__notFound"
      onClick={() => {
        window.history.back();
      }}
    >
      Go Back
    </button>
  </div>
);

export default NotFound;
