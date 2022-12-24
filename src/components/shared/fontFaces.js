import React from "react";

import * as fontFaces from "../../assets/css/font-faces.css";

const FontFaces = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: fontFaces,
    }}
  />
);

export default FontFaces;
