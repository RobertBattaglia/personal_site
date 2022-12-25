import React from "react";

const BlogPostRichSnippet = (props) => {
  const { author, dateModified, datePublished, headline, image } = props;

  const snippet = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: [author].map(({ name, url, jobTitle }) => ({
      "@type": "Person",
      name,
      url,
      jobTitle,
    })),
    dateModified,
    datePublished,
    headline,
    image: [image],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(snippet),
      }}
    />
  );
};

export default BlogPostRichSnippet;
