const breakpoints = [760, 1020, 1180, 1340];

module.exports = {
  breakpoints, 
  theme: {
    primaryFontColor: "#033752",
    primaryColor: "#4ccdd6",
    secondaryColor: "#4078c0",
  },
  mediaQueries: {
    tablet: `@media (min-width: ${breakpoints[0]}px)`,
    smallDesktop: `@media (min-width: ${breakpoints[1]}px)`,
    mediumDesktop: `@media (min-width: ${breakpoints[2]}px)`,
    largeDesktop: `@media (min-width: ${breakpoints[3]}px)`,
  },
};
