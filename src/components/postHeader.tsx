import React from "react"
import { rhythm, scale } from "../utils/typography"

const PostHeader = ({ frontmatter }) => {
  const { title, date, description } = frontmatter
  return (
    <header>
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: 0,
        }}
      >
        {title}
      </h1>
      <div style={{ color: "hsla(0,0%,0%, 0.6)" }}>
        <p
          style={{
            ...scale(-2 / 5),
            display: `block`,
            marginBottom: rhythm(0.25),
          }}
        >
          {date}
        </p>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {description}
        </p>
      </div>
    </header>
  )
}

export default PostHeader
