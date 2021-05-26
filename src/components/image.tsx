import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Image({ src, alt, ...props }) {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            gatsbyImageData
            fluid(maxWidth: 500) {
              originalName
            }
          }
        }
      }
    }
  `)
  const image = allImageSharp.edges.find(
    (edge) => edge.node.fluid.originalName === src
  )
  if (!image) {
    return null
  }
  return <GatsbyImage image={image.gatsbyImageData} alt={alt} {...props} />
}
