import React, { FC } from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import { rhythm } from "../utils/typography"
import Topbar from "./topbar"
import Head from "./head"
import Anchor from "./Anchor"
import H2WithId from "./h2WithId"

interface LayoutProps {
  title: string
}

const Layout: FC<LayoutProps> = ({ title, children }) => {
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
      <main>
        <MDXProvider
          components={{
            h2: H2WithId,
            a: Anchor,
          }}
        >
          {children}
        </MDXProvider>
      </main>
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
