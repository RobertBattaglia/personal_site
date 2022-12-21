import React, { useState, useEffect } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ lang, content }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return content;
  }

  if (lang === "dangerouslysetinnerhtml") {
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
