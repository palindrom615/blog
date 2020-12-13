import React, { FC } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Footer: FC = function () {
  const {
    site: {
      buildTime,
      siteMetadata: { author },
    },
  } = useStaticQuery(graphql`
    query footerInfoQuery {
      site {
        buildTime(formatString: "YYYY")
        siteMetadata {
          author
        }
      }
    }
  `)
  return (
    <footer style={{ textAlign: "center" }}>
      <small>
        copyright(c) {buildTime} {author}. All right reserved.
        <br />
        <Link to={`/disclaimer`} className="lnk">
          disclaimer
        </Link>
      </small>
    </footer>
  )
}

export default Footer
