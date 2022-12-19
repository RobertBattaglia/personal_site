import React from "react";
import { Link } from "gatsby";
import useSound from "use-sound";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import Logo from "assets/images/svgs/logo.svg";
import typing from "assets/sounds/typing.m4a";

import { theme } from "../../constants";

const HeaderStyled = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`;

const growAndRotate = keyframes`
  0% {
    transform-origin: 50% 50%;
  }
  50% {
    transform-origin: 50% 50%;
    transform: rotate(360deg);
  }
  80% {
    transform-origin: 50% 50%;
    transform: scale(1.30);
  }
  100% {
    transform-origin: 50% 50%;
  }
`;

const LogoWrapper = styled(Logo)`
  margin-left: 1.5rem;
  :hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    transform: scale(1.15);
    #N1,
    #N2,
    #N3,
    #N4,
    #N5,
    #N6,
    #N7,
    #N8,
    #N9,
    #N10,
    #N11,
    #N12 {
      animation: ${growAndRotate} 800ms;
    }
  }
`;

export const Button = styled("button")`
  margin-right: 3rem;
  padding: 0.5rem 1rem;
  border: 2px solid #4ccdd6;
  border-radius: 1rem;
  color: ${theme.secondaryColor};
  background-color: #fff;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    background-color: ${theme.secondaryColor};
    color: #fff;
  }
`;

function Header({ page, showingGlasses, setShowingGlasses }) {
  const [playTyping, { stop }] = useSound(typing);

  const enterText = (node) => {
    const messages = [
      "Hi Rob, I'm... ~ and I wanted to contact you because...",
      "What's up Rob, ~ I gotta tell you something crazy...",
      "My name is... ~ I'm going to make you a job offer you cannot refuse...",
    ];
    const text = messages[Math.floor(Math.random() * messages.length)];
    const enterChar = (idx) => {
      const char = text.charAt(idx);
      const timeout = char === "~" ? 500 : Math.random() * 150;
      if (char !== "~") node.value += char;
      if (idx < text.length) {
        setTimeout(() => {
          enterChar(idx + 1);
        }, timeout);
      } else {
        node.focus();
        stop();
      }
    };
    enterChar(0);
  };

  const handleClick = () => {
    const contact = document.querySelector("#contact");
    const messageField = document.querySelector("#contact-message");
    if (!messageField) {
      return;
    }

    messageField.value = "";
    contact.scrollIntoView();
    playTyping();
    window.scrollBy(0, window.innerWidth < 760 ? 60 : 120);
    enterText(messageField);
  };

  return (
    <HeaderStyled>
      {page === "index" ? (
        <LogoWrapper
          onClick={() => {
            if (window.gtag) {
              window.gtag("event", "click", {
                event_category: "logo",
              });
            }
            setShowingGlasses(!showingGlasses);
          }}
        />
      ) : (
        <Link to="/" aria-label="Homepage">
          <LogoWrapper />
        </Link>
      )}
      <Button onClick={handleClick}>Contact</Button>
    </HeaderStyled>
  );
}

export default Header;
