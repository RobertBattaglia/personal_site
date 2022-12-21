import React from "react";
import styled from "@emotion/styled";

import Post from "components/shared/post";
import CodeBlock from "components/blog/codeBlock"
import TweetEmbed from "components/blog/tweetEmbed"

const CodeLine = styled("span")`
  background-color: rgb(245, 247, 255);
  color: rgb(34, 162, 201);
  padding: 0 2px;
  font-size: 18px;
`;

const basicNodeTypeToElementMap = new Map([
  ["document", React.Fragment],
  ["paragraph", "p"],
  ["heading-1", "h1"],
  ["heading-2", "h2"],
  ["heading-3", "h3"],
  ["heading-4", "h4"],
  ["heading-5", "h5"],
  ["heading-6", "h6"],
  ["unordered-list", "ul"],
  ["ordered-list", "ol"],
  ["list-item", "li"],
  ["blockquote", "blockquote"],
]);

const convertBlogBodyToElements = (raw, assets, posts) => {
  let index = -1; // outer count used for unique key of react component
  const parseNode = (node) => {
    const { nodeType, content, data, value, marks } = node;

    const mappedContent = content && content.map(parseNode);

    index++;

    let element = null;
    if (basicNodeTypeToElementMap.has(nodeType)) {
      element = React.createElement(
        basicNodeTypeToElementMap.get(nodeType),
        { key: index },
        mappedContent
      );
    } else if (nodeType === "hr") {
      element = <hr key={index} />;
    } else if (nodeType === "hyperlink") {
      element = <a key={index} href={data.uri}>{mappedContent}</a>;
    } else if (nodeType === "embedded-asset-block") {
      const {
        target: {
          sys: { id },
        },
      } = data;
      let src;
      let description;
      for (const asset of assets) {
        if (id === asset.index) {
          src = asset.node.file.url;
          description = asset.node.description;
          break;
        }
      }

      element = <img key={index} src={src} alt={description} />;
    } else if (nodeType === "entry-hyperlink") {
      const {
        target: {
          sys: { id },
        },
      } = data;
      let postData;

      for (const post of posts) {
        if (id === post.contentful_id) {
          postData = { ...post };
          break;
        }
      }

      element = <Post key={index} data={postData} />;
    } else if (nodeType === "text") {
      const parts = value.split("`");
      if (parts.length < 3) {
        element = value;
      } else {
        const children = [];
        for (let i = 0; i < parts.length; i++) {
          index++;
          if (i % 2 === 0) {
            children.push(parts[i]);
          } else {
            children.push(<CodeLine key={index} >{parts[i]}</CodeLine>);
          }
        }
        element = React.createElement(React.Fragment, { key: index }, children);
      }

      marks.forEach(({ type }) => {
        if (type === "code") {
          const parts = element.split("\n");
          const metaData = parts[0]
          const content = parts.slice(1).join("\n");
          if (metaData === "dangerouslysetinnerhtml") {
            element = <TweetEmbed key={index} content={content} />
          } else {
            element = <CodeBlock key={index} lang={metaData} content={content} />
          }
        } else if (type === "bold") {
          element = <strong key={index}>{element}</strong>;
        } else if (type === "italic") {
          element = <em key={index}>{element}</em>;
        } else if (type === "underline") {
          element = <u key={index}>{element}</u>;
        }
      });
    }

    return element;
  };

  const result = parseNode(JSON.parse(raw));
  return result;
};

export default convertBlogBodyToElements;
