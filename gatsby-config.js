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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `markdown-pages`,
      },
    },
  ],
}

const pluginsProd = [
  `gatsby-plugin-sitemap`,
  {
    resolve: `@palindrom615/gatsby-plugin-subfont`,
    options: {
      fontDisplay: "block",
      fallbacks: false,
      inPlace: true,
      inlineCss: false,
      // FIX: gatsby ssr prevent subfonting per page
      // subsetPerPage: false,
      inputFiles: ["public/**/index.html", "public/404.html"],
    },
  },
]

if (process.env.NODE_ENV != "development") {
  config.plugins = config.plugins.concat(pluginsProd)
}
module.exports = config
