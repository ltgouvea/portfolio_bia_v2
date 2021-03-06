import React from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Overdrive from "react-overdrive";
import styled from "react-emotion";

import { Layout, ProjectHeader, ProjectPagination, SEO } from "components";
import config from "../../config/site";

const OuterWrapper = styled.div`
  padding: 0 ${props => props.theme.contentPadding};
  margin: -6rem auto 6rem auto;
`;

const InnerWrapper = styled.div`
  position: relative;
  max-width: ${props => `${props.theme.maxWidths.project}px`};
  margin: 0 auto;
`;

const VideoWrapper = styled.div`
  position: relative;
  padding: 0 ${props => props.theme.contentPadding};
  margin: -6rem auto 6rem auto;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Project = ({
  pageContext: { slug, prev, next },
  data: { project: postNode }
}) => {
  const images = postNode.frontmatter.images;
  const project = postNode.frontmatter;

  return (
    <Layout>
      <Helmet title={`${project.title} | ${config.siteTitle}`} />
      <SEO postPath={slug} postNode={postNode} postSEO />
      <ProjectHeader
        avatar={config.avatar}
        name={config.name}
        date={project.date}
        title={project.title}
        areas={project.areas}
        text={postNode.html}
      />
      <OuterWrapper>
        <InnerWrapper>
          <Overdrive id={`${slug}-cover`}>
            <img src={project.cover} style={{ margin: '2.75rem 0' }} />
          </Overdrive>
          {images.map(image => (
          <img src={image} key={image} style={{ margin: '2.75rem 0' }} />
          ))}
        </InnerWrapper>
        <ProjectPagination next={next} prev={prev} />
      </OuterWrapper>
    </Layout>
    );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object
  }),
  data: PropTypes.shape({
    project: PropTypes.object.isRequired,
  }).isRequired
};

Project.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null
  })
};

export const pageQuery = graphql`
  query ProjectPostBySlug(
    $slug: String!
  ) {
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        cover
        images
        date(formatString: "DD.MM.YYYY")
        title
        areas
      }
    }
  }
`;
