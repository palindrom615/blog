import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Footer from "./footer"
import "./layout.css"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ marginLeft: "auto" }}>
            <Link to={`/about`}>about</Link>{" "}
            <Link to={`/disclaimer`}>disclaimer</Link>
          </p>
          {header}
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
