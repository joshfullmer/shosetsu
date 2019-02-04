import React, { PureComponent } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FooterContainer = styled.footer`
  background-color: #6e859c;
  padding: 0.85em;

  grid-area: footer;
`;

class Footer extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
  };

  render() {
    const { loggedIn, username, handleLogout } = this.props;
    return (
      <FooterContainer>
        {loggedIn ? (
          <>
            <span>{`Hello ${username}`}</span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </FooterContainer>
    );
  }
}

export default withRouter(Footer);
