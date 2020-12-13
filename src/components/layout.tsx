import React, { FC } from "react"
import { Link, PageProps } from "gatsby"

import { rhythm } from "../utils/typography"
import Topbar from "./topbar"
import Head from "./head"

const Layout: FC<PageProps> = ({ title, children }) => {
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
        <Topbar />
        <Link to={`/`}>
          <h3>{title}</h3>
        </Link>
      </header>
      <main>{children}</main>
      <footer style={{ textAlign: "center" }}>
        <small>
          copyright(c) {new Date().getFullYear()} Jang Whe-moon. All right
          reserved.
          <br />
          <Link to={`/disclaimer`} style={{ marginLeft: "auto" }}>
            disclaimer
          </Link>
        </small>
      </footer>
    </div>
  )
}

export default Layout
