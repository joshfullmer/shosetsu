import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LogoHeader = styled.header`
  background-color: blanchedalmond;
  font-family: Kosugi Maru, Arial;
  font-size: 1.5em;
  text-shadow: 2px 2px lightgray;
  padding: 0.85em;

  grid-area: logo;

  display: grid;
  align-items: center;
  justify-items: center;
`;

const LogoNavLink = styled(NavLink)`
  color: black;

  &:visited {
    color: black;
  }
`;

export default class Logo extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <LogoHeader>
        <LogoNavLink exact to={loggedIn ? '/project' : '/login'}>
          小説
        </LogoNavLink>
      </LogoHeader>
    );
  }
}
