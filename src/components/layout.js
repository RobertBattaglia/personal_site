import React, { useState } from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

import Header from "./shared/header";
import Footer from "./shared/footer";
import Contact from "./shared/contact";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled("main")`
  flex-grow: 1;
`;

const globalStyles = css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Layout = ({ page, children }) => {
  const [showingGlasses, setShowingGlasses] = useState(false);
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { showingGlasses });
    }
    return child;
  });
  return (
    <Container>
      <Global styles={globalStyles} />
      <Header
        page={page}
        showingGlasses={showingGlasses}
        setShowingGlasses={setShowingGlasses}
      />
      <Main showingGlasses={showingGlasses}>{childrenWithProps}</Main>
      <Contact />
      <Footer />
    </Container>
  );
};

export default Layout;
