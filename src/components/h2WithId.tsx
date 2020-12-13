import React, { FC } from "react"
import { FaLink } from "react-icons/fa"
import { Link } from "gatsby"

import { scale } from "../utils/typography"

function children2string(children): string {
  if (typeof children === "string") {
    return children.replace(/\s/g, "_")
  } else if (Array.isArray(children)) {
    return children.flatMap(children2string).join("").replace(/\s/g, "_")
  } else if (typeof children === "object") {
    return children2string(children.props.children).replace(/\s/g, "_")
  }
  return ""
}

const H2WithId: FC = function ({ children, ...props }) {
  const id = children2string(children)
  return (
    <h2 {...props} id={id}>
      {children}{" "}
      <Link to={`#${id}`} style={{ ...scale(0) }} className="lnk">
        <FaLink />
      </Link>
    </h2>
  )
}

export default H2WithId
