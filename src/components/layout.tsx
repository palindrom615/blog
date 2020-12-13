import React from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"
import Topbar from "./topbar"
import "./layout.css"
import Head from "./head"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Head />
        <header>
          <p style={{ display: "flex" }}>
            <Topbar />
          </p>
          <Link to={`/`}>
            <h3>{title}</h3>
          </Link>
        </header>
        <main>{children}</main>
        <footer style={{ display: "flex", justifyContent: "center" }}>
          <small>copyright(c) 2020 Jang Whe-moon. All right reserved.</small>
        </footer>
      </div>
    )
  }
}

export default Layout
