import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import { Card, Header, Layout, ContactForm } from '../components';
import config from '../../config/site';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.theme.gridColumns}, 1fr);
  grid-gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .gatsby-image-outer-wrapper,
  .gatsby-image-wrapper {
    position: static !important;
  }
`;

const Content = styled.div`
  margin: -6rem auto 6rem auto;
  max-width: ${props => props.theme.maxWidths.general};
  padding: 0 ${props => props.theme.contentPadding} 1.45rem;
  position: relative;
`;

const Index = ({ data: { projects, videos } }) => (
  <Layout>
    <Header avatar={config.avatar} name={config.name} location={config.location} socialMedia={config.socialMedia} />
    <Content>
      <Grid>
        {projects.edges.map(project => (
          <Card
            title={project.node.frontmatter.title}
            cover={project.node.frontmatter.cover}
            path={project.node.fields.slug}
            areas={project.node.frontmatter.areas}
            slug={project.node.fields.slug}
            key={project.node.fields.slug}
          />
        ))}
        {videos.edges.map(video => (
          <Card
            title={video.node.frontmatter.title}
            cover={video.node.frontmatter.cover}
            path={video.node.fields.slug}
            areas={video.node.frontmatter.areas}
            slug={video.node.fields.slug}
            key={video.node.fields.slug}
          />
        ))}
      </Grid>
    </Content>
    <ContactForm></ContactForm>
  </Layout>
);

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    videos: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query HomeQuery {
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/projects/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            cover
            date(formatString: "DD.MM.YYYY")
            title
            areas
          }
        }
      }
    }
    videos: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/videos/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            cover
            date(formatString: "DD.MM.YYYY")
            title
            areas
          }
        }
      }
    }
  }
`;
