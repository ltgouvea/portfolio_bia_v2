const path = require('path');
const _ = require('lodash');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node, actions }) => {
  fmImagesToRelative(node);
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const projectPage = path.resolve('src/templates/project.js');
    const videoProjectPage = path.resolve('src/templates/video-project.js');
    resolve(
      graphql(`
        {
          projects: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fileAbsolutePath: { regex: "/projects/" } }
          ) {
            edges {
              node {
                fileAbsolutePath
                fields {
                  slug
                }
                frontmatter {
                  title
                  cover
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
                fileAbsolutePath
                fields {
                  slug
                }
                frontmatter {
                  title
                  cover
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        const projectPosts = result.data.projects.edges;
        const videoProjectPosts = result.data.videos.edges;

        projectPosts.forEach((edge, index) => {
          const next = index === 0 ? null : projectPosts[index - 1].node;
          const prev = index === projectPosts.length - 1 ? null : projectPosts[index + 1].node;

          createPage({
            path: edge.node.fields.slug,
            component: projectPage,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next,
            },
          });
        });

        videoProjectPosts.forEach((edge, index) => {
          const next = index === 0 ? null : videoProjectPosts[index - 1].node;
          const prev = index === videoProjectPosts.length - 1 ? null : videoProjectPosts[index + 1].node;

          createPage({
            path: edge.node.fields.slug,
            component: videoProjectPage,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next,
            },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
