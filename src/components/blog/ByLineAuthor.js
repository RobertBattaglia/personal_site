import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BylineAuthor = ({ authorName }) => {
  const data = useStaticQuery(graphql`
    query AuthorImage {
      s3Object(Key: { eq: "blog:meCropped.jpeg" }) {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FIXED, height: 40)
          }
        }
      }
    }
  `);

  return (
    <>
      <GatsbyImage
        image={getImage(data.s3Object.localFile)}
        loading="eager"
        style={{
          margin: "0 10px",
        }}
        imgStyle={{
          borderRadius: "100%",
        }}
        alt={`${authorName} the Author`}
      />
      <Link
        to="/"
        style={{
          lineHeight: "40px",
          fontWeight: "600",
        }}
      >
        {authorName}
      </Link>
    </>
  );
};

export default BylineAuthor;
