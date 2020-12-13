import React, { FC } from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import { rhythm, scale } from "../utils/typography"
import Topbar from "./topbar"
import Head from "./head"
import Anchor from "./anchor"
import H2WithId from "./h2WithId"
import Footer from "./footer"

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
        padding: `${rhythm(0.5)} ${rhythm(0.5)} 0`,
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
      <Footer />
    </div>
  )
}

export default Layout
