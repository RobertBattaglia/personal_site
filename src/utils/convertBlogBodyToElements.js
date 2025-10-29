import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import Post from "components/shared/post";
import CodeBlock from "components/blog/codeBlock";
import TweetEmbed from "components/blog/tweetEmbed";

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
      // Defensive check: ensure data and data.uri exist
      const href = data?.uri || '#';
      element = (
        <a key={index} href={href}>
          {mappedContent}
        </a>
      );
    } else if (nodeType === "embedded-asset-block") {
      const {
        target: {
          sys: { id },
        },
      } = data;
      let assetUrl;
      let description;
      let width = 900;
      let height = 500;
      for (const asset of assets) {
        if (id === asset.contentful_id) {
          assetUrl = asset.url;
          description = asset.description;
          width = asset.width || 900;
          height = asset.height || 500;
          break;
        }
      }
      element = assetUrl ? (
        <div key={index} style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Image
            src={assetUrl}
            alt={description || ''}
            width={width}
            height={height}
            loading="lazy"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      ) : null;
    } else if (nodeType === "entry-hyperlink") {
      const {
        target: {
          sys: { id },
        },
      } = data;
      let postData;

      console.log('Looking for embedded post with ID:', id);
      console.log('Available posts:', posts.map(p => ({ id: p.contentful_id, title: p.title, hasSlug: !!p.slug, hasFeaturedImage: !!p.featuredImage })));

      for (const post of posts) {
        if (id === post.contentful_id) {
          postData = { ...post };
          console.log('Found matching post:', { title: postData.title, slug: postData.slug, hasImage: !!postData.featuredImage });
          break;
        }
      }

      if (!postData) {
        console.log('No matching post found for ID:', id);
      }

      // Only render if postData was found
      element = postData ? <Post key={index} data={postData} /> : null;
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
            children.push(<CodeLine key={index}>{parts[i]}</CodeLine>);
          }
        }
        element = React.createElement(React.Fragment, { key: index }, children);
      }

      marks.forEach(({ type }) => {
        if (type === "code") {
          const parts = element.split("\n");
          const metaData = parts[0];
          const content = parts.slice(1).join("\n");
          if (metaData === "Tweet") {
            element = <TweetEmbed key={index} content={content} />;
          } else {
            element = (
              <CodeBlock key={index} lang={metaData} content={content} />
            );
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
