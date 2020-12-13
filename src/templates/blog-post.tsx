import React, { FC } from "react"
import { Link, graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import "katex/dist/katex.min.css"
import PostHeader from "../components/postHeader"

const BlogPostTemplate: FC<PageProps> = (props) => {
  const { mdx: post, site } = props.data
  const siteTitle = site.siteMetadata.title
  const { previous, next, slug } = props.pageContext

  return (
    <Layout title={siteTitle} location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        lang={post.frontmatter.lang}
        url={site.siteMetadata.siteUrl + slug}
      />
      <article style={{ display: "flex", flexDirection: "column" }}>
        <PostHeader frontmatter={post.frontmatter} />
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
          }}
        >
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next" className="lnk">
                ← {next.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev" className="lnk">
                {previous.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
