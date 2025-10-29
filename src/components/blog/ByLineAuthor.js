import React from "react";
import Link from "next/link";
import Image from "next/image";

const BylineAuthor = ({ author }) => {
  const renderLink = (url) => {
    const style = { lineHeight: "40px", fontWeight: "600" };

    if (url === "https://robertbattaglia.com") {
      return (
        <Link href="/" style={style}>
          {author.displayName}
        </Link>
      );
    }

    return (
      <a href={author.url} style={style}>
        {author.displayName}
      </a>
    );
  };

  return (
    <>
      {author.image && (
        <Image
          src={author.image.url}
          alt={`${author.name} the Author`}
          width={40}
          height={40}
          priority
          style={{
            margin: "0 10px",
            borderRadius: "100%",
          }}
        />
      )}
      {renderLink(author.url)}
    </>
  );
};

export default BylineAuthor;
