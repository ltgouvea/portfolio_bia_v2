import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import { Layout, ProjectHeader, ProjectPagination, SEO } from 'components';
import config from '../../config/site';

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

  .video-description {
    color: white;
    text-align: center;
    font-size: 1.5em;
  }
`;

const VideoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .video-frame {
    width: 1000px;
    height: 720px;
  }
`;

const Video = ({ title, description, link }) => {
  return (
    <VideoContentWrapper>
      <p className="video-description"> {`${description}`} </p>
      <iframe
        title={`${title}`}
        key={`${title}`}
        className="video-frame"
        src={`${link}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </VideoContentWrapper>
  );
};

Video.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Video.defaultProps = {
  link: null,
  title: null,
  description: null,
};

const VideoProject = ({ pageContext: { slug, prev, next }, data: { project: postNode } }) => {
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
          <VideoWrapper>
            {project.videos.map(video => (
              <Video key={video.title} title={video.title} link={video.link} description={video.description} />
            ))}
          </VideoWrapper>
        </InnerWrapper>
        <ProjectPagination next={next} prev={prev} />
      </OuterWrapper>
    </Layout>
  );
};

export default VideoProject;

VideoProject.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
  }),
  data: PropTypes.shape({
    project: PropTypes.object.isRequired,
  }).isRequired,
};

VideoProject.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
};

export const pageQuery = graphql`
  query videoProjectPostBySlug($slug: String!) {
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        cover
        date(formatString: "DD.MM.YYYY")
        title
        areas
        videos {
          link
          title
          description
        }
      }
    }
  }
`;
