/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"

const Topbar = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <p style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>
        Written by <strong>{author}</strong>.
      </span>
      <span
        style={{
          flex: "0 1 150px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <a href={`https://github.com/${social.github}`}>
          <FaGithub />
        </a>
        <a href={`https://twitter.com/${social.twitter}`}>
          <FaTwitter />
        </a>
        <a href={`https://linkedin.com/in/${social.linkedin}`}>
          <FaLinkedin />
        </a>
      </span>
    </p>
  )
}

export default Topbar
