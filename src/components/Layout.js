import React from 'react';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Layout = ({ date, setDate, children }) => {
  return (
    <div className="App">
      <header className="Header">
        <div className="Title">
          <h1>Speed Test</h1>
        </div>
        <div className="Datepicker">
          <Datepicker
            selected={date}
            onChange={(selected) => setDate(selected)}
            popperPlacement="top-start"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '5px, 10px'
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                boundariesElement: 'viewport'
              }
            }}
          />
        </div>
      </header>
      <div className="Content">{ children }</div>
    </div>
  );
};

export default Layout;
