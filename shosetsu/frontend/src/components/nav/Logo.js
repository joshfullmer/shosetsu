import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const LogoHeader = styled.header`
  background-color: blanchedalmond;
  font-family: Kouzan, Arial;
  font-size: 1.5em;
  text-shadow: 2px 2px lightgray;
`;

export default class Logo extends Component {
  render() {
    return (
      <LogoHeader>
        <NavLink exact to='/'>
          小説
        </NavLink>
      </LogoHeader>
    );
  }
}