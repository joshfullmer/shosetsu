import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #6e859c;
  padding: 0.85em;

  grid-area: footer;
`;

export default function Footer() {
  return <FooterContainer>Footer</FooterContainer>;
}
