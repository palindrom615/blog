const config = {
  siteMetadata: {
    title: `Jang's Blog`,
    author: `Whemoon Jang`,
    description: `palindrom615's blog`,
    siteUrl: `https://palindrom615.dev`,
    social: {
      twitter: `palindrom615`,
      github: `palindrom615`,
      linkedin: `palindrom615`,
    },
    image: "",
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `markdown-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-video`,
            options: {
              width: "100%",
              preload: "auto",
              muted: true,
              autoplay: true,
              playsinline: true,
              controls: true,
              loop: true,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-katex`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-136784336-1`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}

const pluginsProd = [`gatsby-plugin-sitemap`, `gatsby-plugin-subfont`]

const pluginsDev = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/drafts`,
      name: `blog`,
    },
  },
]

if (process.env.NODE_ENV !== "development") {
  config.plugins = config.plugins.concat(pluginsProd)
} else {
  config.plugins = config.plugins.concat(pluginsDev)
}

module.exports = config
