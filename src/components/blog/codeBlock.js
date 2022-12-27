import React, { useState, useEffect } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "@emotion/styled";

const YoutubeContainer = styled("div")`
  position: relative;
  width: 100%;
  height: 315px;

  iframe {
    position: absolute;
    top: 0;
    left 0;
    width: 100%;
    height: 100%;
  }
`;

const CodeBlock = ({ lang, content }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return content;
  }

  if (lang === "youtube") {
    return <YoutubeContainer dangerouslySetInnerHTML={{ __html: content }} />;
  }

  if (lang === "dangerouslysetinnerhtml" || lang === "youtube") {
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  }

  const recognizedLanguages = new Set([
    "javascript",
    "graphql",
    "python",
    "sql",
    "html",
    "css",
    "sass",
    "jsx",
    "json",
    "go",
    "typescript",
    "bash",
  ]);

  const isLanguage = recognizedLanguages.has(lang);
  const language = isLanguage ? lang : "javascript";

  return (
    <SyntaxHighlighter
      language={language}
      style={base16AteliersulphurpoolLight}
      showLineNumbers
      wrapLongLines
    >
      {content}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
