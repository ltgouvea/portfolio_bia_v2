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
  if (postNode.frontmatter.images) {
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
  }

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
            <p>
              Lyric Video da música Goodbye - Lysergic Thoughts (2017). Stop
              motion em massinha, criação, storyboard, animação e composição
              final
            </p>
            <iframe
              title="goodbye"
              width="1000"
              height="720"
              src="https://www.youtube.com/embed/fQMHfgPFcsw"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullscreen
            />
            <p>
              Realização do evento “CineRecreio” oficinas de animação para o
              CEVAC (Centro de Valorização da Criança) da cidade de Bauru (2017)
            </p>
            <iframe
              title="cinerecreio"
              width="1000"
              height="720"
              src="https://www.youtube.com/embed/5YxSUv8Xscs"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullscreen
            />
            <p>Amanara (2016). Roteiro e Captação de Som</p>
            <iframe
              title="amanara"
              width="1000"
              height="720"
              src="https://www.youtube.com/embed/417ZGRfgaZk"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullscreen
            />
            <p>Amanara (2016). Rotoscopia feita no photoshop</p>
            <iframe
              title="amanara-rotoscopia"
              width="1000"
              height="720"
              src="https://www.youtube.com/embed/nnTOXRDJ15g"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullscreen
            />
            <p>Cítrica (2017). Captação de áudio e câmera adicional</p>
            <iframe
              title="citrica"
              src="https://player.vimeo.com/video/208545785"
              width="1000"
              height="720"
              frameBorder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowFullscreen
            />
            <p>Documentário A Terra é Nossa! (2015). Operação de câmera</p>
            <iframe
              title="terranossa"
              width="1000"
              height="720"
              src="https://www.youtube.com/embed/es1gzJIcjkk"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullscreen
            />
            <p>Chocolate (2014). Roteiro e Direção</p>
            <iframe
              title="chocolate"
              width="1000"
              height="720"
              src="https://www.youtube.com/embed/wenIV4Ht_zk"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullscreen
            />
          </VideoWrapper>
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
