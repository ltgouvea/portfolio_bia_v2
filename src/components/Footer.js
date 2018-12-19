import React from 'react';
import styled from 'react-emotion';

const Content = styled.p`
  color: ${props => props.theme.colors.secondary};
  padding: 0 ${props => props.theme.contentPadding};
  text-align: center;
`;

const Footer = () => (
  <Content>
    &copy; 2018 Template GatsbyJS Emilia. Design por{' '}
    <a href="https://www.lekoarts.de" target="_blank" rel="noopener noreferrer">
      LekoArts
    </a>
    .<br />
    <a href="https://github.com/LekoArts/gatsby-starter-portfolio-emilia" target="_blank" rel="noopener noreferrer">
      Github do tema.
    </a>
    <br />
    <a href="https://github.com/ltgouvea" target="_blank" rel="noopener noreferrer">
      Adaptado por Lucas Gouvêa
    </a>
  </Content>
);

export default Footer;
