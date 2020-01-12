const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const page = path.resolve(`./src/templates/page.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                layout
                date
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges.filter(
    p => p.node.frontmatter.layout === "post"
  )

  const pages = result.data.allMarkdownRemark.edges.filter(
    p => p.node.frontmatter.layout === "page"
  )
  pages.forEach((post, idx) => {
    createPage({
      path: post.node.fields.slug,
      component: page,
      context: {
        slug: post.node.fields.slug,
      },
    })
  })
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createRedirect({
      fromPath: `/${post.node.frontmatter.date.replace(/-/g, "/")}/${
        post.node.fields.slug.replace(/\//g, "")
      }`,
      toPath: post.node.fields.slug,
      isPermanent: true,
      redirectInBrowser: true,
    })
    createPage({
      path: post.node.fields.slug.replace(/\//g, ""),
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, trailingSlash: false })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
