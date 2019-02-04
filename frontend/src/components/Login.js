import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import Body from './styled/Body';
import Main from './styled/Main';
import BreadcrumbsHeader from './breadcrumbs/BreadcrumbsHeader';
import Toolbar from './styled/Toolbar';

const LoginBody = styled(Body)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: inherit;
  grid-template-areas:
    'title'
    'main'
    'toolbar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: inherit;
    grid-template-areas:
      'title toolbar'
      'main main'
      'main main';
  }
`;

const LoginContainer = styled(Main)`
  overflow: auto;
`;

const Forms = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-auto-rows: minmax(250px, auto);
  }
`;

export default class Login extends PureComponent {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleSignUp: PropTypes.func.isRequired
  };

  render() {
    const { handleLogin, handleSignUp } = this.props;
    return (
      <LoginBody>
        <BreadcrumbsHeader>Login to Shosetsu</BreadcrumbsHeader>
        <LoginContainer>
          <Forms>
            <LoginForm {...this.props} handleLogin={handleLogin} />
            <SignUpForm {...this.props} handleSignUp={handleSignUp} />
          </Forms>
        </LoginContainer>
        <Toolbar />
      </LoginBody>
    );
  }
}
