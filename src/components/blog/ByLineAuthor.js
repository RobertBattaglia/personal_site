import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BylineAuthor = ({ author }) => {
  const renderLink = (url) => {
    const style = { lineHeight: "40px", fontWeight: "600" };

    if (url === "https://robertbattaglia.com") {
      return (
        <Link to="/" style={style}>
          {author.name}
        </Link>
      );
    }

    return (
      <a href={author.url} style={style}>
        {author.name}
      </a>
    );
  };

  return (
    <>
      <GatsbyImage
        image={getImage(author.image.gatsbyImageData)}
        loading="eager"
        style={{
          margin: "0 10px",
        }}
        imgStyle={{
          borderRadius: "100%",
        }}
        alt={`${author.name} the Author`}
      />
      {renderLink(author.url)}
    </>
  );
};

export default BylineAuthor;