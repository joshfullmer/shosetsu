import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

export default function Logo() {
  return (
    <LogoHeader>
      <LogoNavLink exact to="/">
        小説
      </LogoNavLink>
    </LogoHeader>
  );
}
