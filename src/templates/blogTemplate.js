import React from "react"
import Helmet from 'react-helmet';
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  const { frontmatter, html } = markdownRemark;
  const dataStructured = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "test"
  };
  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title} | {siteMetadata.title}</title>
        <meta name="description" content={frontmatter.metaDescription} />
        <script type="application/ld+json">
          {`
              {
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "Event Name",
                "startDate": "2025-07-21T19:00-05:00",
                "endDate": "2025-07-21T23:00-05:00",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "image": ["https://img.culturacolectiva.com/cdn-cgi/image/f=auto,w=auto,q=80,fit=contain/content_image/2019/10/3/1570143993215-muse-en-cdmx-resena-del-concierto-3.jpeg"],
                "location": {
                  "@type": "Place",
                  "name": "Madrid",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Paseo de la Castellana, 42",
                    "addressLocality": "Madrid",
                    "postalCode": "28020",
                    "addressRegion": "MAD",
                    "addressCountry": "ESP"
                  }
                },
                "description": "Really great talk.",
                "offers": {
                  "@type": "Offer",
                  "url": "https://www.example.com/event_offer/12345_201803180430",
                  "price": "30",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "validFrom": "2024-05-21T12:00"
                },
                "performer": {
                  "@type": "PerformingGroup",
                  "name": "Giorgio"
                },
                "organizer": {
                  "@type": "Organization",
                  "name": "Soamee",
                  "url": "http://soanee.com"
                }
              }
            `}
        </script>
      </Helmet>
      <div className="blog-post-container">
        <article className="post">
          
          {!frontmatter.thumbnail && (
            <div className="post-thumbnail">
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          {!!frontmatter.thumbnail && (
            <div className="post-thumbnail" style={{backgroundImage: `url(${frontmatter.thumbnail})`}}>
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail
        metaDescription
      }
    }
  }
`