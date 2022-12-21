import React, { useState, useEffect } from "react";

const TweetEmbed = ({ content }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

export default TweetEmbed;
