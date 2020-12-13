import React, { FC } from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import { rhythm, scale } from "../utils/typography"
import Topbar from "./topbar"
import Head from "./head"
import Anchor from "./anchor"
import H2WithId from "./h2WithId"

interface LayoutProps {
  title: string
  location: Location
}

const Layout: FC<LayoutProps> = ({ title, location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        paddingTop: `${rhythm(0.5)}`,
      }}
    >
      <Head />
      <header>
        <Topbar />
        <Link to={`/`}>
          <h3 style={location.pathname === rootPath ? { ...scale(1.5) } : {}}>
            {title}
          </h3>
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
          <Link to={`/disclaimer`} className="lnk">
            disclaimer
          </Link>
        </small>
      </footer>
    </div>
  )
}

export default Layout
