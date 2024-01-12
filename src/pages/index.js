import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import Deprecated, {DeprecatedGlobals} from "../components/deprecated";

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
  {
    text: "Examples",
    url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
    description:
      "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
  },
]

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
  { text: "Deferred Static Generation", url: "using-dsg" },
]

const moreLinks = [
  { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
  {
    text: "Documentation",
    url: "https://gatsbyjs.com/docs/",
  },
  {
    text: "Starters",
    url: "https://gatsbyjs.com/starters/",
  },
  {
    text: "Showcase",
    url: "https://gatsbyjs.com/showcase/",
  },
  {
    text: "Contributing",
    url: "https://www.gatsbyjs.com/contributing/",
  },
  { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
]

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`


const TestDepreciation = Deprecated('div', `
  h5 {
    color: red;
  }
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.12);
  color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  min-height: 120px;
  padding-bottom: 0rem;
  padding-left: 8.9rem;
  padding-right: 8.9rem;
  padding-top: 0rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 400;

  a .icon { filter: none; }
  .icon { filter: none; }

  a { color: var(--color-dark); }
  .header-right > div { border-color: var(--color-dark); }
  .header-right .text-size:before,
  .header-right .text-size.increase:after { border-color: var(--color-dark); }

  &.is-stuck {
    color: var(--color-dark);
    a { color: var(--color-dark); }
    .header-right > div { border-color: var(--color-dark); }
    .header-right .text-size:before,
    .header-right .text-size.increase:after { border-color: var(--color-dark); }
  }

  &.takeover-active {
    color: var(--color-light);
    a { color: var(--color-light); }
    a .icon { filter: brightness(0) invert(1); }
    .icon { filter: brightness(0) invert(1); }
    .site-logo { filter: brightness(0) invert(1); }
    .header-right > div { border-color: var(--color-light); }
    .header-right .text-size:before,
    .header-right .text-size.increase:after { border-color: var(--color-light); }
  }

  @media screen and (min-width: 1921px) {
    padding-left: 40rem;
    padding-right: 40rem;
  }

  @media only screen and (max-width: 1280px) {
    min-height: auto;
    padding-bottom: 2.1rem;
    padding-left: 2.1rem;
    padding-right: 2.1rem;
    padding-top: 2.1rem;
    position: relative;
  }

  @media only screen and (max-width: 600px) {
    &.takeover-active {
      position: fixed;
    }
    
    &.lp-header {
      margin-top: 81px;
  }
  
}
`)

const IndexPage = () => (
  <Layout>
    <DeprecatedGlobals />
    <TestDepreciation>
      <h5>Depreciation test component</h5>
    </TestDepreciation>
    <div className={styles.textCenter}>
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
      <p className={styles.intro}>
        <b>Example pages:</b>{" "}
        {samplePageLinks.map((link, i) => (
          <React.Fragment key={link.url}>
            <Link to={link.url}>{link.text}</Link>
            {i !== samplePageLinks.length - 1 && <> · </>}
          </React.Fragment>
        ))}
        <br />
        Edit <code>src/pages/index.js</code> to update this page.
      </p>
    </div>
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.url} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${link.url}${utmParameters}`}
          >
            {link.text} ↗
          </a>
          <p className={styles.listItemDescription}>{link.description}</p>
        </li>
      ))}
    </ul>
    {moreLinks.map((link, i) => (
      <React.Fragment key={link.url}>
        <a href={`${link.url}${utmParameters}`}>{link.text}</a>
        {i !== moreLinks.length - 1 && <> · </>}
      </React.Fragment>
    ))}
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
