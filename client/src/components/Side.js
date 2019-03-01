import React, { Component } from 'react';
import { SideNav, Nav } from 'react-sidenav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = styled.div`
  flex-shrink: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.125)
  background: #303641;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 20vw;
  line-height: 22px;

`;
const theme = {
  selectionColor: '#FFF',
  hoverBgColor: '#181b20'
};
const Text = styled.div`
  padding-left: 8px;
  text-decoration: none !important;
`;

class Side extends Component {
  render() {
    return (
        <div>
          <div className="head">
            <h3>
              <Text>->/home/kenn/project-overkill</Text>
            </h3>
          </div>
          <Navigation>
            <SideNav
              defaultSelectedPath="1"
              theme={theme}
            >
              <Link to='/today'>
                <Nav id="1">
                  <Text>Today</Text>
                </Nav>
              </Link>
              <Link to='/date'>
                <Nav id="2">
                  <Text>Selected Date</Text>
                </Nav>
              </Link>
            </SideNav>
          </Navigation>
        </div>
    );
  }
}

export default Side;
