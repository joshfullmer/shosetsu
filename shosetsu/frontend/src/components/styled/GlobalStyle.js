import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Kouzan';
    src: url('/static/frontend/fonts/KouzanGyoushoTTF.ttf');
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-size: 1.2em;
    font-family: 'Varela Round', sans-serif;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }

  a:link {
    text-decoration: none;
    color: white;
  }

  a:visited {
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: underline;
    color: darkblue;
  }

  a:active {
    text-decoration: underline;
    color: darkblue;
  }
`;

export default GlobalStyle;
